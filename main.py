
from bottle import Bottle, template, static_file,redirect,request, response
import database
import users
import re

app = Bottle()

@app.route('/static/<filename:path>')
def static(filename):
    """Static file Handling method for all static files in root static"""

    return static_file(filename=filename, root='static')

@app.route('/')
def index(db):
    """handles routing to main page"""

    pageInfo = {'title': 'Comp4050'}

    return template('index', pageInfo, authenticated=users.session_user(db))

@app.route('/about')
def about(db):
    """made this page to test session cookie function"""

    info = {'title': 'About'}

    return template('About', info, authenticated=users.session_user(db))

@app.route('/createAccount')
def accountPage(db):
    """handles routing to account creation page"""

    pageInfo = {'title': 'Comp4050',
                'bannerMessage': 'Create an account'}

    return template('createAccount', pageInfo, authenticated=users.session_user(db))

@app.post('/createAcc')
def route(db):
    """handles new account creation
    """
    info = {'title': 'Login Error',
            'bannerMessage': 'An account under this email already exists please login or try another email'
    }

    info1 = {'title': 'Login Error',
            'bannerMessage': 'Password must contain at least 1 capital letter, 1 number and be atleast 7 characters long'
    }

    password = request.forms.get("password")
    pWordResult = password_test(password)
    if not pWordResult:
        return template('createAccount', info1, authenticated=users.session_user(db))

    email = request.forms.get("email")
    name = request.forms.get("name")
    suburb = request.forms.get("suburb")

    log = database.add_user(db, password, email, name, suburb)
    print(log)
    if(log):#if user is valid
        users.generate_session(db, name)
        return redirect('/')
    else:
        return template('createAccount', info, authenticated=users.session_user(db))



def password_test(pWord):
    """ Tests if password is atleast 7 characters and contains atleast 1 capital letter"""
    password = pWord
    rgx = re.compile(r'\d.*?[A-Z].*?[a-z]')
    if rgx.match(''.join(sorted(password))) and len(password) >= 7:
        return True
    return False

@app.get('/accountSettings')
def account_settings(db):
    """Update account details or settings, must enter password to be able to do so"""

    info = {'title': 'Account',
            'bannerMessage': ''}
    return template('account', info, authenticated=users.session_user(db),validated=False)

@app.post('/pwordCheck')
def acc(db):
    """validates password"""
    info = {'title': 'Account',
            'bannerMessage':''}
    info1 = {'title': 'Account',
            'bannerMessage': 'Wrong Password'}

    password = request.forms.get("password")
    usern= users.session_user(db)
    result = users.check_password(db, usern, database.password_hash(db,password,usern))
    if(result):
        return template('account', info, authenticated=users.session_user(db), validated=True)
    else:
        return template('account', info1, authenticated=users.session_user(db), validated=False)

@app.post('/login')
def route(db):
    """handles login of users,
    form data is proccessed (taken from the login form), from here data is checked to see if user is valid, if so
    a session is generated for the user and then the user is redirected to the index page otherwise they are
    redirected to a page where they must enter their credentials again, the user is kept on this page until correct
    credentials are entered at which point they are redirected to the index page logged in,

    A cookie is assigned to each valid user once they login through the function users.generate_session()
    in order to track whether they are logged in or not
    """
    info = {'title': 'Login Error, please try to login again or create an account'}

    name = request.forms.get("name")
    password = request.forms.get("password")
    log = users.check_login(db, name, password)
    if(log):#if user is valid
        users.generate_session(db,name)
        return redirect('/')
    else:
        return template('splash', info, authenticated=users.session_user(db))


@app.post('/logout', methods=['GET'])
def logout(db):
    """"handles logging out of  a user, once a user clicks the logout button they are logged out by removing their
    current session from the database via the function users.delete_session(),
    their cookie is also removed thus logging them out,
    a redirect occurs once successfully logged out to index page where they will once again be asked to login
    """
    users.delete_session(db, users.session_user(db))

    response.delete_cookie(users.COOKIE_NAME)

    redirect('/')

if __name__ == '__main__':
    from bottle.ext import sqlite
    from database import DATABASE_NAME
    # install the database plugin to utilise db parameter calling
    app.install(sqlite.Plugin(dbfile=DATABASE_NAME))
    app.run(debug=True, port=8010)


