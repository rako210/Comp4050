
import sqlite3
import hashlib
import string
import secrets
import datetime


# The database name
DATABASE_NAME = 'comp4050.db'

"------------------------------------------------------------------------------------------------------------"
"Password creation methods"


def password_hash(db, password, user):
    """Return a one-way hashed version of the password suitable for
    storage in the database, checks if a user name an password is provided,
    salts the password and returns it"""

    if type(user) is int:
        check = True
    elif type(user) is str:
        if len(user) > 0 and len(password) > 6:
            check = True
        else:
            check = False
    else:
        check = False

    if check:
        salt = return_salt(db, user)
        if salt:
            return hashlib.sha256((password + salt).encode()).hexdigest()
        else:
            return False


def firstPassword_hash(password, salt):
    """Return a one-way hashed version of the password suitable for
    storage in the database, salts password and returns,
    used in database table initilisation """

    return hashlib.sha256((password + salt).encode()).hexdigest()


def generate_salt():
    """returns a random 8 character value consisting of
    upper and lower case characters  and single digits"""
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(8))
    return password


def return_salt(db, user):
    """returns a salt value for a user, could move this to users module but cbbs"""
    cursor = db.cursor()
    if type(user) is int:
        sql = "SELECT rand FROM users WHERE userID=?"
    else:
        sql = "SELECT rand FROM users WHERE username=?"
    cursor.execute(sql, (user,))
    data = cursor.fetchone()
    if data is None:
        return False
    else:
        return data[0]


"------------------------------------------------------------------------------------------------------------"
"table creation"


def create_tables(db):
    """Create and initialise the database tables. Will ovewrite
    on each call"""

    sql = """
    
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        username text,
        email text,
        password text,
        userID integer unique primary key autoincrement,
        name test,
        suburb text,
        rand text,
        avatar text
    );
    
    DROP TABLE IF EXISTS sessions;
    CREATE TABLE sessions (
        sessionid text unique primary key,
        user text,
        FOREIGN KEY(user) REFERENCES users(username)
    );
    
    DROP TABLE IF EXISTS jobListing;
    CREATE TABLE jobListing (
        jobID integer unique primary key autoincrement,
        timestamp text default CURRENT_TIMESTAMP,
        userID,
        owner text,
        title text,
        location text, 
        description text,
        FOREIGN KEY(owner) REFERENCES users(username)
    );
    
    DROP TABLE IF EXISTS ;
    CREATE TABLE "jobApplication" (
        "jobID"	INTEGER NOT NULL,
        "userID"	INTEGER NOT NULL,
        "status"	INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY("jobID") REFERENCES "users"("userID"),
        FOREIGN KEY("userID") REFERENCES "jobListing"("jobID"),
        PRIMARY KEY("jobID","userID")
    );
    """

    db.executescript(sql)
    db.commit()


"------------------------------------------------------------------------------------------------------------"
"initial user addition"


def add_user(db, username, email, password, name, suburb):
    """"Adds a user to the database , ensures username is not already in use"""
    cursor = db.cursor()
    # check username is not in use
    sql = "SELECT 1 FROM users WHERE username=?"
    data = cursor.execute(sql, (username,))
    if data.fetchone():
        return False
    else:
        salt = generate_salt()
        sql = "INSERT INTO users (username, email, password, name, suburb, rand) VALUES (?,?,?,?,?,?)"
        cursor.execute(sql, [username, email, firstPassword_hash(
            password, salt), name, suburb, salt])
        db.commit()
        return True


"------------------------------------------------------------------------------------------------------------"
"user profile update functions, could have combined these tbh"


def update_password(db, newPassword, userID):
    cursor = db.cursor()
    sql = "UPDATE users SET password =? WHERE userID=?"
    cursor.execute(sql, (newPassword, userID))
    db.commit()
    return True


def update_email(db, newEmail, userID):
    cursor = db.cursor()
    sql = "UPDATE users SET email =? WHERE userID=?"
    cursor.execute(sql, (newEmail, userID))
    db.commit()
    return True


def update_suburb(db, newSuburb, userID):
    cursor = db.cursor()
    sql = "UPDATE users SET suburb =? WHERE userID=?"
    cursor.execute(sql, (newSuburb, userID))
    db.commit()
    return True


def update_name(db, newName, userID):
    cursor = db.cursor()
    sql = "UPDATE users SET name =? WHERE userID=?"
    cursor.execute(sql, (newName, userID))
    db.commit()
    return True


def update_avatar(db, userID, avatar):
    """adds avatar path to db according to userID"""
    cursor = db.cursor()
    sql = "UPDATE users SET avatar =? WHERE userID=?"
    cursor.execute(sql, (avatar, userID))
    db.commit()
    return True


"------------------------------------------------------------------------------------------------------------"
"table print methods"


def print_users(db):
    """printing users table for troubleshooting"""
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users')
    data = cursor.fetchall()
    for row in data:
        print(row[0])
        print(row[1])
        print(row[2])
        print(row[3])
        print(row[4])
        print(row[5])
        print(row[6])


"------------------------------------------------------------------------------------------------------------"
"job advert methods"


def add_jobListing(db, userID, postOwner, title, location, description):
    """CHANGE THIS LATER Add a new job post to the database.
    The date of the post will be the current time and date.

    Return True if the record was added, False if not."""
    cursor = db.cursor()
    sql = """INSERT INTO jobListing (userID ,owner, title, location, description) VALUES (?,?, ?, ?, ?)"""
    cursor.execute(sql, [userID, postOwner, title, location, description])
    db.commit()

    return True


def edit_job_listing(db, owner, title, location, description, jobID, selectedUser):
    cursor = db.cursor()
    sql = """
        UPDATE jobListing
        SET owner=?, title=?, location=?, description=?, selectedUserID=?
        WHERE jobID=?;
    """
    cursor.execute(sql, (owner, title, location,
                         description, selectedUser, jobID,))
    db.commit()

    return True


def get_listing(db, id):
    """Return the details of the position with the given id
    or None if there is no position with this id

    Returns a tuple (id, timestamp, owner, title, location, company, description)

    """
    cursor = db.cursor()
    sql = "SELECT * FROM jobListing WHERE jobID=? AND userID =?"
    data = cursor.execute(sql, (id, userID))
    # fetchone only works only once unless you make data.fetchone returns list if it exists doesnt otherwise
    return data.fetchone()


def delete_jobListing(db, id):
    """CHANGE LATER, Delete a joblisting"""
    print(id)
    cursor = db.cursor()
    sql = "DELETE FROM jobListing WHERE jobID=?"
    cursor.execute(sql, (id,))
    db.commit()


def position_list(db, userID, limit=10):
    """Return a list of jobs ordered by date
    db is a database connection
    return at most limit positions (default 10)

    Returns a list of tuples  (id, timestamp, owner, title, location, company, description)
    """
    if userID != None:
        # sql = "SELECT * FROM jobListing WHERE userID =? ORDER BY timestamp DESC LIMIT ? "
        sql = """
            SELECT jobListing.*
            FROM jobListing
            WHERE jobListing.userID=?
            ORDER BY timestamp DESC LIMIT ?; 
        """
        cursor = db.cursor()

        data = cursor.execute(sql, (userID, limit))
        return list(data)
    sql = "SELECT * FROM jobListing ORDER BY timestamp DESC LIMIT ? "
    cursor = db.cursor()

    data = cursor.execute(sql, (limit,))
    return list(data)

def get_username(db, userID):

    if(userID == None):
        return ""

    cursor = db.cursor()
    sql = """
        SELECT username
        FROM users
        WHERE userID=?
    """
    data = cursor.execute(sql, (userID,))
    data = data.fetchone()
    return data[0]

def apply_for_job(db, job_id, user_id):
    """ Simply associate a job with a user and set the status of the task"""

    cursor = db.cursor()
    sql = "INSERT INTO jobApplication(jobID, userID, status) VALUES (?, ?, ?);"

    cursor.execute(sql, (job_id, user_id, 0))
    db.commit()


def get_users_applied_for_job(db, job_id):
    """
        Get a list of users that have applied for a particular job given a job_id.

        The data returned is described below:

        [
            {'userID': 3},
            {'userID': 6}
        ]
    """

    cursor = db.cursor()

    sql = """
        SELECT jobApplication.userID, users.name
        FROM jobApplication
        INNER JOIN users ON jobApplication.userID=users.userID
        WHERE jobID=?
    """

    data = cursor.execute(sql, (job_id,))
    data = data.fetchall()

    temp = [dict(zip([key[0] for key in cursor.description], row))
            for row in data]

    print(temp)

    return temp


def get_user_jobs(db, user_id):

    # Return list of jobs a user has applied for
    cursor = db.cursor()
    sql = "SELECT * from jobApplication where userID=?;"
    data = cursor.execute(sql, (user_id,))
    data = data.fetchall()

    temp = [dict(zip([key[0] for key in cursor.description], row))
            for row in data]

    return temp


def check_apply_for_job(db, user_id, job_id):

    # Return True if user has already applied for a particular job

    cursor = db.cursor()
    sql = "SELECT * from jobApplication where userID=? and jobID=?;"
    data = cursor.execute(sql, (user_id, job_id,))
    data = data.fetchall()

    if (len(data) > 0):
        return True

    return False

    # for row in data:
    #     print(str(row[0]) + " " + str(row[1]) + " " + str(row[2]))
    #     print(len(data))


"Task Methods"


def set_task_status(db, jobID, status):

    cursor = db.cursor()
    sql = """
        UPDATE jobListing
        SET status=?
        WHERE jobID=?; 
    """
    cursor.execute(sql, (status, jobID,))


def mark_task_as_in_progress(db, jobID):

    set_task_status(db, jobID, 1)


def mark_task_as_complete(db, jobID):

    set_task_status(db, jobID, 2)

def get_task_status(db, jobID):
    "0 - Looking for Helpers, 1 - In Progress, 2 - Completed"
    cursor = db.cursor()
    sql = """
        SELECT status
        FROM jobListing
        WHERE jobID=?
    """
    data = cursor.execute(sql, (jobID,))
    data = data.fetchone()
    
    return data[0]




"------------------------------------------------------------------------------------------------------------"
if __name__ == '__main__':

    """Run this file with python to initilise tables and clear table data"""
    db = sqlite3.connect(DATABASE_NAME)
    create_tables(db)
