

from database import password_hash
import uuid, bottle


#import password hashing method from database
# this variable MUST be used as the name for the cookie used by this application
COOKIE_NAME = 'sessionid'


def check_login(db, user, password):
    """returns True if password matches stored password for user"""
    p = password_hash(db, password, user)#convert password to a hash in order to compare
    cursor = db.cursor()

    sql = "SELECT * FROM users WHERE username=? AND password=?"
    data = cursor.execute(sql,(user,p,))

    if data.fetchone():
        return True
    return False



def generate_session(db, user):
    """create a new session and add a cookie to the response object (bottle.response)
    user must be a valid user in the database, if not, return None
    There should only be one session per user at any time, if there
    is already a session active, use the existing sessionid in the cookie
    """

    # Check whether user is valid
    sql = 'SELECT username FROM users WHERE username = ?'
    cur = db.cursor()
    cur.execute(sql, (user, ))
    result = cur.fetchall()#return all fields that match username
    if len(result) != 1:# handles bug for two users with same name
        return None
    # Check whether the user has a valid session
    sql = 'SELECT * FROM sessions WHERE user = ?'
    cur.execute(sql, (user, ))
    result = cur.fetchall()
    if len(result) > 0:
        return bottle.response.set_cookie(COOKIE_NAME, result[0][0])
    # Generates session for user if they do not have one and assigns a random session id to a cookie
    key = str(uuid.uuid4())
    sql = 'INSERT INTO sessions (sessionid, user) VALUES (?, ?)'
    cur.execute(sql, (key, user))
    return bottle.response.set_cookie(COOKIE_NAME, key)

def delete_session(db, user):
    """remove all session table entries for this user"""
    cursor = db.cursor()
    sql = "DELETE FROM sessions WHERE user=?"
    cursor.execute(sql,(user,))

def session_user(db):
    """try to
    retrieve the user from the sessions table
    return user or None if no valid session is present"""
    cursor = db.cursor()
    sql = "SELECT user FROM sessions WHERE sessionid=?"
    key = bottle.request.get_cookie(COOKIE_NAME)
    cursor.execute(sql,(key,))
    data = cursor.fetchone()
    if data:
        return data[0]
    return None

def return_userID(db, user):
    """Returns the unique userID for user when provided their username"""
    cursor = db.cursor()
    sql = "SELECT userID FROM users WHERE username=?"
    cursor.execute(sql,(user,))
    data = cursor.fetchone()
    if data:
        return data[0]
    return None

def check_password(db, user, password):
    """verifies password for a logged in user , I MADE THIS BY ACCIDENT BUT KEPT IT CAUSE CBSS,
     PRE MUCH THE SAME AS CHECK_LOGIN"""
    cursor = db.cursor()
    sql = "SELECT password FROM users WHERE username=?"
    cursor.execute(sql,(user,))
    data = cursor.fetchone()
    if data[0] == password:
        return True
    return False

def check_user(db, username):
    """checks if a user exists within the db"""
    cursor = db.cursor()
    sql = "SELECT username FROM users WHERE username=?"
    cursor.execute(sql,(username,))
    data = cursor.fetchone()
    if data:
        print(data[0])
        return True
    return False

