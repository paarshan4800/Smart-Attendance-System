import { Component, OnInit,HostListener } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {

  facultyCourseDetailsForAtt;
  viewAtt = new AttendanceView('', '1');
  showStudentList;
  studentList;
  facultyId;
  noStudentsEnrolled;
  sendServerStudentList;
  attendanceMarkedSuccessfully;
  noDateGiven;
  allStudentsMarked;
  originalStudentListLength;

  constructor(private attendanceService: AttendanceService, private router: Router, private route: ActivatedRoute,private cookie:CookieService) {

    this.route.params.subscribe(params => {
      this.facultyId = params['facultyId']
    })

    if (this.cookie.check('facultyMark') === false) {
      this.router.navigate(['../../../signin/faculty'])
    }

    this.facultyCourseDetailsForAtt = this.attendanceService.facultyCourseDetailsGetter();
  }

  ngOnInit(): void {
    this.showStudentList = false;
    this.attendanceMarkedSuccessfully = false;
    this.noDateGiven = false;
  }

  @HostListener('window:beforeunload') goToPage() {
    if (this.cookie.check('facultyMark') === true) {
      this.cookie.delete('facultyMark', '/');
    }
  }

  submitMarkAttStudentList() {
    if (this.viewAtt.date === "") {
      this.noDateGiven = true;
    }
    else {
      this.noDateGiven = false;
      this.facultyCourseDetailsForAtt['date'] = this.viewAtt.date;
      this.facultyCourseDetailsForAtt['hours'] = this.viewAtt.hours;
      this.attendanceService.pyMarkAttendanceGetStudentList(this.facultyCourseDetailsForAtt).subscribe(data => {


        if (data.status === false) {
          this.showStudentList = true;
          this.noStudentsEnrolled = true;
        }
        else {
          this.noStudentsEnrolled = false;
          this.showStudentList = true;
          this.studentList = data.studentList;
          this.originalStudentListLength = this.studentList.length;
          for (var i = 0; i < this.studentList.length; i++) {
            this.studentList[i].push({
              "showPresent": true,
              "showAbsent": true,
              "showEdit": false,
              "presentClickable": true,
              "absentClickable": true,
            });
          }
          this.sendServerStudentList = {
            "facultyId": this.facultyCourseDetailsForAtt['facultyId'],
            "courseId": this.facultyCourseDetailsForAtt['courseId'],
            "date": this.viewAtt.date,
            "hours": this.viewAtt.hours,
            "studentList": []
          }
        }
      },error => {this.router.navigate(['/error'])})
    }
  }

  clickPresent(data) {
    this.sendServerStudentList.studentList.push(data);
    this.studentList[data.index][2].showAbsent = false;
    this.studentList[data.index][2].showEdit = true;
    this.studentList[data.index][2].presentClickable = false;
    console.log(this.sendServerStudentList.studentList)
  }

  clickAbsent(data) {
    this.sendServerStudentList.studentList.push(data);
    this.studentList[data.index][2].showPresent = false;
    this.studentList[data.index][2].showEdit = true;
    this.studentList[data.index][2].absentClickable = false;
    console.log(this.sendServerStudentList.studentList)
  }

  clickEdit(data) {
    for (var j = 0; j < this.sendServerStudentList.studentList.length; j++) {
      if (this.sendServerStudentList.studentList[j].rollNo === data.rollNo) {
        if (j === 0) {
          this.sendServerStudentList.studentList.splice(j, j + 1);
        }
        else {
          this.sendServerStudentList.studentList.splice(j, j);
        }
      }
      this.studentList[data.index][2].showPresent = true;
      this.studentList[data.index][2].showAbsent = true;
      this.studentList[data.index][2].showEdit = false;
      this.studentList[data.index][2].absentClickable = true;
      this.studentList[data.index][2].presentClickable = true;
    }
    console.log(this.sendServerStudentList.studentList);
  }

  onClickMarkAtt() {
    console.log("LENGTH:", this.originalStudentListLength)
    if (this.sendServerStudentList.studentList.length < this.originalStudentListLength) {
      this.allStudentsMarked = false;
    }
    else {
      this.allStudentsMarked = true;
    }
  }

  submitStudentAttendance() {


    this.attendanceService.pyMarkAttendance1(this.sendServerStudentList).subscribe(data => {
      if (data.status === true) {
        this.attendanceMarkedSuccessfully = true;
      }
    },error => {this.router.navigate(['/error'])})
  }
}


class AttendanceView {
  constructor(
    public date: string,
    public hours: string
  ) { }
}