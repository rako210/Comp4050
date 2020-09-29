from bottle import Bottle, template, static_file, redirect, request, response
import json
import database
import users
import re
import os

app = Bottle()


@app.route('/static/<filename:path>')
def static(filename):
    """Static file Handling method for all static files in root static"""

    return static_file(filename=filename, root='static')


@app.route('/user_login')
def main(db):
    return {'data': str(users.session_user(db))}


@app.get('/accountSettings')
def account_settings(db):
    """Update account details or settings, must enter password to be able to do so"""

    info = {'title': 'Account',
            'bannerMessage': '', }
    return template('account', info, authenticated=users.session_user(db), validated=False, invalidPword=False)


@app.route('/createAccount')
def accountPage(db):
    """handles routing to account creation page"""

    pageInfo = {'title': 'Create Account',
                'bannerMessage': 'Create an account'}

    return template('createAccount', pageInfo, authenticated=users.session_user(db))


@app.post('/createAcc')
def route(db):
    """handles new account creation
    """
    info = {'title': 'Creation Error',
            'bannerMessage': 'An account under this email already exists please login or try another email'
            }

    info1 = {'title': 'Creation Error',
             'bannerMessage': 'Password must contain at least 1 capital letter, 1 number and be atleast 7 characters long'
             }

    info2 = {'title': 'Creation Error',
             'bannerMessage': 'Please enter all fields!'
             }

    username = request.forms.get("username")
    if username.isspace() or not username:
        return template('createAccount', info2, authenticated=users.session_user(db))

    password = request.forms.get("password")
    pWordResult = password_test(password)
    if not pWordResult:
        return template('createAccount', info1, authenticated=users.session_user(db))

    email = request.forms.get("email")

    "SHOULD PROBS ADD JAVASCRIPT TO CHECK name and suburb ARE FILLED AND CHECK FILE TYPE OF IMAGE"
    name = request.forms.get("name")
    suburb = request.forms.get("suburb")
    image = request.files.get("image")
    log = database.add_user(db, username, email, password, name, suburb)

    if log:  # if user is valid
        if image is not None:
            uid = users.return_userID(db, username)
            imagePath = userImage_upload(uid, image)
            database.update_avatar(db, uid, imagePath)

        users.generate_session(db, username)
        return redirect('/')
    else:
        return template('createAccount', info, authenticated=users.session_user(db))


@app.post('/updateAccount')
def account_update(db):
    """handles account updates"""

    info = {'title': 'Account',
            'bannerMessage': 'Populated fields updated'
            }

    flag = False
    uid = users.return_userID(db, users.session_user(db))
    password = request.forms.get("pword")
    if len(password) > 0:
        if password_test(password):
            newPassword = database.password_hash(db, password, uid)
            if newPassword is not False:
                database.update_password(db, newPassword, uid)
            else:
                flag = True
        else:
            flag = True

    email = request.forms.get("email")
    if len(email) > 0:
        database.update_suburb(db, email, uid)

    suburb = request.forms.get("suburb")
    if len(suburb) > 0:
        database.update_suburb(db, suburb, uid)

    name = request.forms.get("name")
    if len(name) > 0:
        database.update_name(db, name, uid)

    image = request.files.get("image")
    if image is not None:
        imagePath = userImage_upload(uid, image)
        database.update_avatar(db, uid, imagePath)

    if(flag):
        return {'result': "False"}
    else:
        return {'result': "True"}

    # return template('account', info, authenticated=users.session_user(db), validated=True, invalidPword=flag)


def password_test(pWord):
    """ Tests if password is atleast 7 characters and contains atleast 1 capital letter"""
    password = pWord
    rgx = re.compile(r'\d.*?[A-Z].*?[a-z]')
    if rgx.match(''.join(sorted(password))) and len(password) >= 7:
        return True
    return False


def userImage_upload(user, image):
    root = os.path.abspath(os.curdir)  # does this line work on all os' ?
    path = root + "/static/userImages/" + "DP user -- " + \
        str(user) + " -- " + image.filename
    image.save(path, overwrite=True)
    return path


@app.post('/pwordCheck')
def acc(db):
    """validates password"""
    info = {'title': 'Account',
            'bannerMessage': ''}
    info1 = {'title': 'Account',
             'bannerMessage': 'Wrong Password'}

    password = request.forms.get("password")
    usern = users.session_user(db)
    result = users.check_password(
        db, usern, database.password_hash(db, password, usern))
    if (result):
        return {'result': str(True)}
        # return template('account', info, authenticated=users.session_user(db), validated=True, invalidPword=False)
    else:
        return {'result': str(False)}
        # return template('account', info1, authenticated=users.session_user(db), validated=False, invalidPword=False)


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
    if (log):  # if user is valid
        users.generate_session(db, name)
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


@app.post('/addtask', methods=['GET'])
def task(db):
    """"
    redirects to the addtask form page
    """

    info = {'title': 'Add Task',
            'bannerMessage': 'yeanah'}

    username = users.session_user(db)

    # The user must be logged in order to add a task.
    if username == None:
        print("Please login in order to add a task.")
        return redirect('/')
    else:
        return template('addtask', info, authenticated=users.session_user(db))


@app.post('/addingtask', methods=['GET'])
def task(db):
    """"
    Will take the form from addtask.html and add the respective task to the database
    """
    userID = users.session_user(db)
    owner = request.forms.get("owner")
    title = request.forms.get("title")
    location = request.forms.get("location")
    description = request.forms.get("descrip")

    database.add_jobListing(db, userID, owner, title, location, description)

    redirect('/')

    return {'result': "True"}


@app.post('/gettask', methods=['GET'])
def task(db):
    """"
    Will return based on the button pressed. It will then return the relative tasks in a top 10 format
    """

    tasktype = request.forms.get("tasktype")

    if tasktype == "1":
        usrid = users.session_user(db)
        tasklist = database.position_list(db, usrid)
        newtrack = []

        loginisTrue = False

        if users.session_user(db):
            loginisTrue = True

        for x in tasklist:
            dict1 = {
                'id': x[0],
                'time': x[1],
                'owner': x[2],
                'title': x[3],
                'location': x[4],
                'description': x[5]
            }
            newtrack.append(dict1)
        info = {'title': 'Account',
                'bannerMessage': '',
                'task': newtrack}

        return {'result': newtrack}

        # return template('index', info, authenticated=users.session_user(db), tasksexist=True, loginIsTrue=loginisTrue)

    if tasktype == "0":
        tasklist = database.position_list(db, None)
        newtrack = []

        loginisTrue = False

        if users.session_user(db):
            loginisTrue = True

        for x in tasklist:
            dict1 = {
                'id': x[0],
                'time': x[1],
                'owner': x[2],
                'title': x[3],
                'location': x[4],
                'description': x[5]
            }
            newtrack.append(dict1)
        info = {'title': 'Account',
                'bannerMessage': '',
                'task': newtrack}

        return {'result': newtrack}


@app.post('/deletetask', methods=['GET'])
def task(db):
    """"
    Deletes respective ID'd task
    """
    taskid = request.forms.get("taskid")
    print(taskid)
    database.delete_jobListing(db, taskid)
    redirect('/')


def get_user_id(db):
    return users.return_userID(db, users.session_user(db))


@app.get('/api/getUserID')
def getUserID(db):
    return {'result': get_user_id(db)}


@app.post('/apply_for_task', methods=['GET'])
def apply_for_task(db):

    # Retrieve Task ID
    job_id = request.forms.get("id")
    # Retrieve User ID
    user_id = get_user_id(db)

    # Check if User is logged in
    if user_id:

        # Check if user has already applied for the job
        if not (database.check_apply_for_job(db, user_id, job_id)):
            # Mark user as having been applied for the job
            database.apply_for_job(db, job_id, user_id)
        else:
            print("You have already applied for the job!")

        # Return OK result
        return {'result': "True"}

    else:

        # Return Fail Result
        return {'result': "False"}


@app.get('/api/getUserTasks')
def getUserTasks(db):

    ret_val = database.get_user_jobs(db, get_user_id(db))

    return {'result': ret_val}


@app.get('/api/list/task/all')
def task(db):

    all_tasks = database.position_list(db, None)
    registerd_tasks = tasks_registered_by_user(db)
    ret_val = []

    for task in all_tasks:

        is_registered = False

        for registered_task in registerd_tasks:
            if(registered_task['jobID'] == task[0]):
                is_registered = True

        ret_val.append({
            'id': task[0],
            'time': task[1],
            'owner': task[3],
            'title': task[4],
            'location': task[5],
            'description': task[6],
            'isRegistered': is_registered
        })

    return {'result': ret_val}


@app.get('/api/list/task/created-by-user')
def task(db):

    user_id = users.session_user(db)
    task_list = database.position_list(db, user_id)
    ret_val = []

    for x in task_list:
        ret_val.append({
            'id': x[0],
            'time': x[1],
            'owner': x[3],
            'title': x[4],
            'location': x[5],
            'description': x[6]
        })

    return {'result': ret_val}


@app.get('/api/list/task/registered-by-user')
def tasks_registered_by_user_json(db):

    ret_val = database.get_user_jobs(db, get_user_id(db))

    return {'result': ret_val}


def tasks_registered_by_user(db):

    ret_val = database.get_user_jobs(db, get_user_id(db))

    return ret_val


@app.post('/api/list/task/registed-for-task', methods=['GET'])
def users_registered_for_task(db):

    jobID = json.loads(str(request.body.read(), encoding='utf-8'))['jobID']

    data = database.get_users_applied_for_job(db, jobID)

    return {'result': data}


@app.post('/api/task/edit')
def edit_task(db, methods=['GET']):

    user_id = users.session_user(db)
    job_id = request.forms.get("jobID")
    owner = request.forms.get("owner")
    title = request.forms.get("title")
    location = request.forms.get("location")
    description = request.forms.get("descrip")

    database.edit_job_listing(db, owner, title, location, description, job_id)

    return {'result': "True"}


if __name__ == '__main__':
    from bottle.ext import sqlite
    from database import DATABASE_NAME

    # install the database plugin to utilise db parameter calling
    app.install(sqlite.Plugin(dbfile=DATABASE_NAME))
    app.run(debug=True, port=8010)
