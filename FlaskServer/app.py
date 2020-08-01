from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
cors = CORS(app)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_DB'] = 'cegsas'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'PaarShanDB0408'

mysql = MySQL(app)


class Student:
    def __init__(self, rollNo):
        self.rollNo = rollNo


class Faculty:
    def __init__(self, facultyId):
        self.facultyId = facultyId



@app.route('/StudentSignIn', methods=["POST"])
def StudentSignIn():
    data = request.get_json()
    #{'rollNo': '0123456789', 'password': 'peakyblinders'}
    student = Student(int(data['rollNo']))

    cur = mysql.connection.cursor()
    sql = """select pass_word from students where roll_no=%s"""
    cur.execute(sql, [student.rollNo])
    db_data = cur.fetchone()
    del student
    cur.close()

    if db_data == None or db_data[0] != data['password']:
        return {"status": False, "msg": "Invalid Roll No/Password"}
    else:
        return {"status": True}


@app.route('/FacultySignIn', methods=["POST"])
def FacultySignIn():
    data = request.get_json()
    #{'facultyId': '10001', 'password': 'abraham001'}
    faculty = Faculty(data['facultyId'])

    cur = mysql.connection.cursor()
    sql = """select pass_word from faculty where faculty_id=%s"""
    cur.execute(sql, [faculty.facultyId])
    db_data = cur.fetchone()
    del faculty
    cur.close()

    if(db_data == None or db_data[0] != data['password']):
        return {"status": False, "msg": "Invalid Faculty ID/Password"}
    else:
        return {"status": True}


@app.route('/StudentHome', methods=["POST"])
def StudentHome():
    userData = request.get_json()
    #{'rollNo': '2018103075'}

    cur = mysql.connection.cursor()
    sql = """select e.course_id,c.course_name,e.present,e.absent,e.percent from\
             course c inner join enrolls e on e.course_id=c.course_id and e.roll_no=%s"""
    cur.execute(sql, [userData['rollNo']])
    db_data = cur.fetchall()
    # (('CS6106', 'Database Management Systems', 0, 0, 0),) -> Tuple of Tuples

    return jsonify(db_data)


@app.route('/StudentDetails', methods=["POST"])
def StudentDetails():
    userData = request.get_json()
    #{'rollNo': '2018103075'}

    cur = mysql.connection.cursor()
    sql = """select * from students where roll_no=%s"""
    cur.execute(sql, [userData['rollNo']])
    db_data = cur.fetchone()
    #(2018103075, 'umar3075', 'Umar', 'Ahmed', 'T', 'umar.ahmed@gmail.com', datetime.date(2000, 10, 30), 'M')

    return jsonify(db_data)


@app.route('/FacultyHome', methods=["POST"])
def FacultyHome():
    userData = request.get_json()
    #{'facultyId': '10001'}

    cur = mysql.connection.cursor()
    sql = """select t.course_id,c.course_name from teaches t inner join course c on\
                t.course_id=c.course_id and t.faculty_id=%s"""
    cur.execute(sql, [userData['facultyId']])
    db_data = cur.fetchall()
    # (('CS6106', 'Database Management Systems'),) -> Tuple of tuples

    return jsonify(db_data)


@app.route('/FacultyDetails', methods=["POST"])
def FacultyDetails():
    userData = request.get_json()
    #{'facultyId': '10001'}

    cur = mysql.connection.cursor()
    sql = """select faculty_id,first_name,last_name,initials,email_id from\
                 faculty where faculty_id=%s"""
    cur.execute(sql, [userData['facultyId']])
    db_data = cur.fetchone()
    #(10001, 'Abraham', 'Silberschatz', ' ', 'abraham.silberschatz@gmail.com')

    return jsonify(db_data)


@app.route('/AttendanceShortage', methods=["POST"])
def AttendanceShortage():
    userData = request.get_json()
    #{'facultyId': '10001', 'courseId': 'CS6106'}

    cur = mysql.connection.cursor()
    sql = """select s.roll_no,concat(s.first_name,' ',s.last_name,' ',s.initials),e.percent from \
                enrolls e inner join students s on e.roll_no=s.roll_no and e.roll_no in \
                    (select roll_no from student_faculty where faculty_id=%s and course_id=%s) \
                        and course_id=%s and e.absent+e.present>0 and e.percent<75"""
    cur.execute(sql, [userData['facultyId'],
                      userData['courseId'], userData['courseId']])
    db_data = cur.fetchall()
    #((2018103075, 'Umar Ahmed T', 33),)

    return {"courseId": userData['courseId'], "studentDetails": db_data}


@app.route('/ViewAttendance', methods=["POST"])
def viewAttendance():
    userData = request.get_json()
    #{'facultyId': '10001', 'courseId': 'CS6106', 'courseName': 'Database Management Systems', 'date': '2020-05-28', 'hours': '1'}

    cur = mysql.connection.cursor()
    sql = """select a.roll_no,a.hour,concat(s.first_name,' ',s.last_name,' ',s.initials) from\
                attendance_log a inner join students s on faculty_id=%s and course_id=%s and a_date=%s\
                     and a.roll_no=s.roll_no"""

    cur.execute(sql, [int(userData['facultyId']),
                      userData['courseId'], userData['date']])
    db_data = cur.fetchall()
    #((2018103075, 4, 'Umar Ahmed T'),)

    if(len(db_data) == 0):
        return {"status": False, "msg": "No classes on that day"}

    return {"status": True, "studentList": db_data}


@app.route('/MarkAttendanceStudentList', methods=["POST"])
def MarkAttendanceStudentList():
    userData = request.get_json()
    #{'facultyId': '10001', 'courseId': 'CS6106', 'courseName': 'Database Management Systems', 'date': '2020-05-29', 'hours': '1'}

    cur = mysql.connection.cursor()
    sql = """select sf.roll_no,concat(s.first_name,' ',s.last_name,' ',s.initials) from\
                student_faculty sf inner join students s on sf.faculty_id=%s and sf.course_id=%s\
                     and sf.roll_no=s.roll_no"""
    cur.execute(sql, [userData['facultyId'], userData['courseId']])
    db_data = cur.fetchall()
    #((2018103006, 'Akash Kirthik G'),)

    if(len(db_data) == 0):
        return {"status": False, "msg": "No students enrolled in this course"}

    return {"status": True, "studentList": db_data}


@app.route('/MarkAttendance', methods=["POST"])
def MarkAttendance():
    userData = request.get_json()
    # {
    # 'facultyId': '10001',
    # 'courseId': 'CS6106',
    # 'date': '2020-05-09',
    # 'hours': '1',
    # 'studentList': [
    #   {'rollNo': 2018103006, 'present': True, 'index': 0},
    #   {'rollNo': 2018103060, 'present': False, 'index': 1},
    #   {'rollNo': 2018103075, 'present': True, 'index': 2}
    # ]
    # }

    cur = mysql.connection.cursor()

    for i in userData['studentList']:
        if i['present'] == True:
            hourEntry = int(userData['hours'])
        else:
            hourEntry = int(userData['hours'])*-1

        sql = """insert into attendance_log (roll_no,course_id,faculty_id,hour,a_date) values (%s,%s,%s,%s,%s)"""
        cur.execute(sql, [i['rollNo'], userData['courseId'],
                          userData['facultyId'], hourEntry, userData['date']])

        mysql.connection.commit()

        if i['present'] == True:
            sql = """ update enrolls set present=present+%s where roll_no=%s and course_id=%s"""
            cur.execute(sql, [hourEntry, i['rollNo'], userData['courseId']])
        else:
            sql = """ update enrolls set absent=absent-%s where roll_no=%s and course_id=%s"""
            cur.execute(sql, [hourEntry, i['rollNo'], userData['courseId']])
        mysql.connection.commit()

        sql = """ select present,absent from enrolls where roll_no=%s and course_id=%s"""
        cur.execute(sql, [i['rollNo'], userData['courseId']])
        db_data = cur.fetchone()
        print(db_data)

        percentEntry = (db_data[0]/(db_data[0] + db_data[1]))*100
        sql = """update enrolls set percent=%s where roll_no=%s and course_id=%s"""
        cur.execute(sql, [percentEntry, i['rollNo'], userData['courseId']])
        mysql.connection.commit()

    return {"status": True, "msg": "Attendance Marked Successfully"}


@app.route('/DelUpdAttendanceStudentList', methods=["POST"])
def DelUpdAttendanceStudentList():
    userData = request.get_json()
    #{'facultyId': '10001', 'courseId': 'CS6106', 'courseName': 'Database Management Systems', 'date': '2020-05-29'}

    cur = mysql.connection.cursor()
    sql = """select al.roll_no,concat(s.first_name,' ',s.last_name,' ',s.initials),al.hour from\
         attendance_log al inner join students s on al.a_date=%s and\
              al.faculty_id=%s and al.course_id=%s and al.roll_no=s.roll_no"""

    cur.execute(
        sql, [userData['date'], userData['facultyId'], userData['courseId']])
    db_data = cur.fetchall()
    #((2018103006, 'Akash Kirthik G',2),)

    if(len(db_data) == 0):
        return {"status": False, "msg": "No classes on that day"}

    return {"status": True, "studentList": db_data}


@app.route('/UpdAttendance', methods=["POST"])
def DelUpdAttendance():
    userData = request.get_json()
    # {
    #     'facultyId': '10001',
    #     'courseId': 'CS6106',
    #     'date': '2020-06-22',
    #     'hours': 2,
    #     'studentList': [
    #         {'rollNo': 2018103006, 'present': True},
    #     ]
    # }
    userData['hours'] = abs(userData['hours'])

    cur = mysql.connection.cursor()

    for i in userData['studentList']:
        # Fetch the old hour from attendance_log to subtract it from enrolls
        sql = """select hour from attendance_log where roll_no=%s and faculty_id=%s and course_id=%s and a_date=%s"""
        cur.execute(sql,[i['rollNo'],userData['facultyId'],userData['courseId'],userData['date']])
        oldHour = cur.fetchone()

        # Now update the attendance_log with new hour value
        sql = """update attendance_log set hour=%s where roll_no=%s and faculty_id=%s and course_id=%s and a_date=%s"""
        if i['present'] == True:
            hour = userData['hours']
        else:
            hour = userData['hours']*-1

        cur.execute(sql,[hour,i['rollNo'],userData['facultyId'],userData['courseId'],userData['date']])
        mysql.connection.commit()

        # Make absent/percent undo once using oldHour
        if oldHour[0]>0:
            sql = """update enrolls set present=present-%s where roll_no=%s and course_id=%s"""
        else:
            sql = """update enrolls set absent=absent-%s where roll_no=%s and course_id=%s"""
            
        cur.execute(sql,[userData['hours'],i['rollNo'],userData['courseId']])

        # If present, then update in present. Else in absent
        if i['present'] == True:
            sql = """update enrolls set present=present+%s where roll_no=%s and course_id=%s"""

        else:
            sql = """update enrolls set absent=absent+%s where roll_no=%s and course_id=%s"""
            
        cur.execute(sql,[userData['hours'],i['rollNo'],userData['courseId']])
        mysql.connection.commit()

        # Update percent using updated present and absent values
        sql = """update enrolls set percent=(present/(present+absent))*100 where roll_no=%s and course_id=%s"""
        cur.execute(sql,[i['rollNo'],userData['courseId']])
        mysql.connection.commit()

    return {"status":True,"msg":"Attendance Updated Successfully"}
        
@app.route("/DelAttendance",methods=["POST"])
def DelAttendance():
    userData = request.get_json()
    # {'facultyId': '10001', 'courseId': 'CS6106', 'courseName': 'Database Management Systems', 'date': '2020-06-23'}

    cur = mysql.connection.cursor()

    sql = """select roll_no,hour from attendance_log where course_id=%s and faculty_id=%s and a_date=%s"""
    cur.execute(sql,[userData['courseId'],userData['facultyId'],userData['date']])
    studentList = cur.fetchall()
    # ((2018103006,2),)

    sql = """delete from attendance_log where course_id=%s and faculty_id=%s and a_date=%s"""
    cur.execute(sql,[userData['courseId'],userData['facultyId'],userData['date']])
    mysql.connection.commit()

    for i in studentList:
        # Make absent/percent undo once using oldHour
        oldHour = abs(i[1])
        if i[1]>0:
            sql = """update enrolls set present=present-%s where roll_no=%s and course_id=%s"""
        else:
            sql = """update enrolls set absent=absent-%s where roll_no=%s and course_id=%s"""
            
        cur.execute(sql,[oldHour,i[0],userData['courseId']])
        mysql.connection.commit()

        # Update percent using updated present and absent values
        sql = """select present,absent from enrolls where roll_no=%s and course_id=%s"""
        cur.execute(sql,[i[0],userData['courseId']])
        db_data = cur.fetchone()

        if db_data[0]+db_data[1] == 0:
            sql = """update enrolls set percent=0 where roll_no=%s and course_id=%s"""
        else:    
            sql = """update enrolls set percent=(present/(present+absent))*100 where roll_no=%s and course_id=%s"""
        
        cur.execute(sql,[i[0],userData['courseId']])
        mysql.connection.commit()

    return {"status":True,"msg":"Attendance Deleted Successfully"}

if __name__ == "__main__":
    app.run(debug=True)
