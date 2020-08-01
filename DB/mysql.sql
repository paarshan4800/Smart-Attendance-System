CREATE TABLE students(
    roll_no int NOT NULL ,
    pass_word varchar(25) NOT NULL,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    initials varchar(5),
    email_id varchar(40) NOT NULL,
    dob date NOT NULL,
    gender varchar(1) NOT NULL,
    PRIMARY KEY(roll_no)
);

CREATE TABLE faculty(
    faculty_id int NOT NULL ,
    pass_word varchar(25) NOT NULL,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    initials varchar(5),
    email_id varchar(40) NOT NULL,
    PRIMARY KEY(faculty_id)
);


CREATE TABLE course(
    course_id varchar(10) NOT NULL ,
    course_name varchar(60) NOT NULL,
    PRIMARY KEY(course_id)
);



CREATE TABLE enrolls(
    roll_no int NOT NULL,
    course_id varchar(10) NOT NULL,
    present int NOT NULL,
    absent int NOT NULL,
    percent int NOT NULL,
    PRIMARY KEY (roll_no, course_id),
    FOREIGN KEY (roll_no) REFERENCES students (roll_no) on delete CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (course_id) on delete CASCADE
);

CREATE TABLE teaches(
    faculty_id int NOT NULL,
    course_id varchar(10) NOT NULL,
    PRIMARY KEY (faculty_id, course_id),
    FOREIGN KEY (faculty_id) REFERENCES faculty (faculty_id) on delete CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (course_id) on delete CASCADE
);

CREATE TABLE student_faculty(
    roll_no int NOT NULL,
    faculty_id int NOT NULL,
    course_id varchar(10) NOT NULL,
    PRIMARY KEY (roll_no,faculty_id,course_id),
    FOREIGN KEY (roll_no,course_id) REFERENCES enrolls (roll_no,course_id) on delete CASCADE,
    FOREIGN KEY (faculty_id,course_id) REFERENCES teaches (faculty_id,course_id)
);



CREATE TABLE attendance_log(
    attendance_id int not null auto_increment,
    roll_no int NOT NULL,
    course_id varchar(10) NOT NULL,
    faculty_id int NOT NULL ,
    hour int NOT NULL,
    a_date timestamp,
    PRIMARY KEY (attendance_id,roll_no,faculty_id,course_id),
    FOREIGN KEY (roll_no,faculty_id,course_id) REFERENCES student_faculty (roll_no,faculty_id,course_id)
);


