INSERT INTO students VALUES (2018103075,'umar3075','Umar','Ahmed','T','umar.ahmed@gmail.com',STR_TO_DATE('10-30-2000','%m-%d-%Y'),'M');
INSERT INTO students VALUES (2018103006,'akash3006','Akash','Kirthik','G','akash.kirthik@gmail.com',STR_TO_DATE('07-26-2000','%m-%d-%Y'),'M');
INSERT INTO students VALUES (2018103060,'serjius3060','Serjius','Infanto','S','serjius.infanto@gmail.com',STR_TO_DATE('02-14-2001','%m-%d-%Y'),'M');
INSERT INTO students VALUES (2018103054,'ritika3054','Ritika',' ','M','ritika.m@gmail.com',STR_TO_DATE('2000-06-01','%Y-%m-%d'),'F');




INSERT INTO faculty VALUES (10002,'henry002','Henry','Korth','F','henry.korth@gmail.com');
INSERT INTO faculty VALUES (10001,'abraham001','Abraham','Silberschatz',' ','abraham.silberschatz@gmail.com');
INSERT INTO faculty VALUES (10003,'greg003','Greg','Gagne',' ','greg.gagne@gmail.com');
INSERT INTO faculty VALUES (19001,'stephen001','Stephen','Friedberg','H','stephen.friedberg@gmail.com');
INSERT INTO faculty VALUES (10004,'john004','John','Hopcroft','E','john.hopcroft@gmail.com');
INSERT INTO faculty VALUES (17001,'gilbert001','Gilbert','Masters','M','gilbert.masters@gmail.com');
INSERT INTO faculty VALUES (17002,'benny002','Benny','Joseph',' ','benny.joseph@gmail.com');
INSERT INTO faculty VALUES (10005,'ellis005','Ellis',' Horowit',' ','ellis.horowit@gmail.com');
INSERT INTO faculty VALUES (10006,'morris006','Morris','Mano','M','morris.mano@gmail.com');
INSERT INTO faculty VALUES (19002,'milton002','Milton','J','S','milton.j@gmail.com');





INSERT INTO course VALUES ('CS6106','Database Management Systems');
INSERT INTO course VALUES ('CS6108','Operating Systems');
INSERT INTO course VALUES ('MA6201','Linear Algebra');
INSERT INTO course VALUES ('CS6202','Theory of Computation');
INSERT INTO course VALUES ('CY6391','Environmental Science and Engineering'); 
INSERT INTO course VALUES ('CS6104','Data Structures and Algorithms '); 
INSERT INTO course VALUES ('CS6105','Digital Fundamentals and Computer Organization'); 
INSERT INTO course VALUES ('MA6351','Probability and Statistic'); 
INSERT INTO course VALUES ('GE6251','Engineering Graphic'); 
INSERT INTO course VALUES ('CY6251','Engineering Chemistry'); 






INSERT INTO teaches VALUES (10001,'CS6106');
INSERT INTO teaches VALUES (10002,'CS6106');
INSERT INTO teaches VALUES (10001,'CS6108');
INSERT INTO teaches VALUES (10003,'CS6108');
INSERT INTO teaches VALUES (19001,'MA6201');
INSERT INTO teaches VALUES (10004,'CS6202');
INSERT INTO teaches VALUES (17001,'CY6391');
INSERT INTO teaches VALUES (17002,'CY6391');
INSERT INTO teaches VALUES (10005,'CS6104');
INSERT INTO teaches VALUES (10006,'CS6105');
INSERT INTO teaches VALUES (19002,'MA6351');







INSERT INTO enrolls VALUES (2018103075,'CS6106',0,0,0);
INSERT INTO enrolls VALUES (2018103075,'CS6108',0,0,0);
INSERT INTO enrolls VALUES (2018103075,'MA6201',0,0,0);
INSERT INTO enrolls VALUES (2018103075,'CY6391',0,0,0);
INSERT INTO enrolls VALUES (2018103006,'CS6106',0,0,0);
INSERT INTO enrolls VALUES (2018103006,'CS6108',0,0,0);
INSERT INTO enrolls VALUES (2018103006,'CS6202',0,0,0);
INSERT INTO enrolls VALUES (2018103006,'CY6391',0,0,0);
INSERT INTO enrolls VALUES (2018103060,'CS6106',0,0,0);
INSERT INTO enrolls VALUES (2018103060,'CS6108',0,0,0);
INSERT INTO enrolls VALUES (2018103060,'MA6201',0,0,0);
INSERT INTO enrolls VALUES (2018103060,'CY6391',0,0,0);








INSERT INTO student_faculty VALUES (2018103075,10001,'CS6106');
INSERT INTO student_faculty VALUES (2018103075,10002,'CS6106');
INSERT INTO student_faculty VALUES (2018103075,10003,'CS6108');
INSERT INTO student_faculty VALUES (2018103075,19001,'MA6201');
INSERT INTO student_faculty VALUES (2018103075,17001,'CY6391');

INSERT INTO student_faculty VALUES (2018103060,10001,'CS6106');
INSERT INTO student_faculty VALUES (2018103060,10002,'CS6106');
INSERT INTO student_faculty VALUES (2018103060,10003,'CS6108');
INSERT INTO student_faculty VALUES (2018103060,19001,'MA6201');
INSERT INTO student_faculty VALUES (2018103060,17002,'CY6391');

INSERT INTO student_faculty VALUES (2018103006,10001,'CS6106');
INSERT INTO student_faculty VALUES (2018103006,10002,'CS6106');
INSERT INTO student_faculty VALUES (2018103006,10003,'CS6108');
INSERT INTO student_faculty VALUES (2018103006,10004,'CS6202');
INSERT INTO student_faculty VALUES (2018103006,17002,'CY6391');







INSERT INTO ATTENDANCE_LOG (roll_no,course_id,faculty_id,hour,a_date) VALUES (2018103075,'CS6106',10001,4,STR_TO_DATE('2020-05-28','%Y-%m-%d'));
INSERT INTO ATTENDANCE_LOG (roll_no,course_id,faculty_id,hour,a_date) VALUES (2018103006,'CS6106',10001,4,STR_TO_DATE('2020-05-28','%Y-%m-%d'));
INSERT INTO ATTENDANCE_LOG (roll_no,course_id,faculty_id,hour,a_date) VALUES (2018103060,'CS6106',10001,-4,STR_TO_DATE('2020-05-28','%Y-%m-%d'));