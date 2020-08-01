import { Component, OnInit,HostListener } from '@angular/core';
import { AttendanceService } from '../attendance.service';
import { ActivatedRoute, Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-deleteupdate',
  templateUrl: './deleteupdate.component.html',
  styleUrls: ['./deleteupdate.component.css']
})
export class DeleteupdateComponent implements OnInit {

  facultyCourseDetailsForAtt;



  viewAtt = new AttendanceView('');
  showStudentList;
  studentList;
  facultyId;
  noClassesOnThatDay;
  sendServerStudentList;
  attendanceUpdatedSuccessfully;
  attendanceDeletedSuccessfully;
  noDateGiven;
  allStudentsMarked;
  originalStudentListLength;

  constructor(private attendanceService: AttendanceService, private router: Router, private route: ActivatedRoute,private cookie:CookieService) {

    this.route.params.subscribe(params => {
      this.facultyId = params['facultyId']
    })

    if (this.cookie.check('facultyDelUpd') === false) {
      this.router.navigate(['../../../signin/faculty'])
    }

    this.facultyCourseDetailsForAtt = this.attendanceService.facultyCourseDetailsGetter();
  }

  ngOnInit(): void {
    this.showStudentList = false;
    this.attendanceUpdatedSuccessfully = false;
    this.attendanceDeletedSuccessfully = false;
    this.noClassesOnThatDay = false;
    this.noDateGiven = false;
  }

  @HostListener('window:beforeunload') goToPage() {
    if (this.cookie.check('facultyDelUpd') === true) {
      this.cookie.delete('facultyDelUpd', '/');
    }
  }


  submitDelUpdStudentList() {
    if (this.viewAtt.date === "") {
      this.noDateGiven = true;
    }
    else {
      this.noDateGiven = false;
      this.facultyCourseDetailsForAtt['date'] = this.viewAtt.date;
      this.attendanceService.pyDelUpdAttendanceGetStudentList(this.facultyCourseDetailsForAtt).subscribe(data => {
        if (data.status === false) {
          this.showStudentList = true;
          this.noClassesOnThatDay = true;
        }
        else {
          this.noClassesOnThatDay = false;
          this.showStudentList = true;
          this.studentList = data.studentList;
          this.originalStudentListLength = this.studentList.length;
          this.sendServerStudentList = {
            "facultyId": this.facultyCourseDetailsForAtt['facultyId'],
            "courseId": this.facultyCourseDetailsForAtt['courseId'],
            "date": this.viewAtt.date,
            "hours":data.studentList[0][2],
            "studentList": []
          }
          for (var i = 0; i < this.studentList.length; i++) {
            if (this.studentList[i][2] > 0) {
              console.log("MANUTD");
              this.studentList[i].push({
                "showPresent": true,
                "showAbsent": false,
                "showEdit": true,
                "presentClickable": false,
                "absentClickable": false
              });
              this.sendServerStudentList.studentList.push({"rollNo":data.studentList[i][0],"present":true});
            }
            else {
              this.studentList[i].push({
                "showPresent": false,
                "showAbsent": true,
                "showEdit": true,
                "presentClickable": false,
                "absentClickable": false
              });
              this.sendServerStudentList.studentList.push({"rollNo":data.studentList[i][0],"present":false});
            }
          }

          
        }
      },error => {this.router.navigate(['/error'])})
    }
  }

  clickPresent(data) {
    this.sendServerStudentList.studentList.push({"rollNo":data.rollNo,"present":data.present});
    this.studentList[data.index][3].showAbsent = false;
    this.studentList[data.index][3].showEdit = true;
    this.studentList[data.index][3].presentClickable = false;
    console.log(this.sendServerStudentList.studentList)
  }

  clickAbsent(data) {
    this.sendServerStudentList.studentList.push({"rollNo":data.rollNo,"present":data.present});
    this.studentList[data.index][3].showPresent = false;
    this.studentList[data.index][3].showEdit = true;
    this.studentList[data.index][3].absentClickable = false;
    console.log(this.sendServerStudentList.studentList)
  }

  clickEdit(data) {
    this.studentList[data.index][3].showPresent = true;
    this.studentList[data.index][3].showAbsent = true;
    this.studentList[data.index][3].showEdit = false;
    this.studentList[data.index][3].presentClickable = true;
    this.studentList[data.index][3].absentClickable = true;

    for (var j = 0; j < this.sendServerStudentList.studentList.length; j++) {
      if (this.sendServerStudentList.studentList[j].rollNo === data.rollNo) {
        if (j === 0) {
          this.sendServerStudentList.studentList.splice(j, j + 1);
        }
        else {
          this.sendServerStudentList.studentList.splice(j, j);
        }
      }
    }
    console.log(this.sendServerStudentList.studentList);
  }

  onClickUpdAtt() {
    console.log("LENGTH:", this.originalStudentListLength)
    if (this.sendServerStudentList.studentList.length < this.originalStudentListLength) {
      this.allStudentsMarked = false;
    }
    else {
      this.allStudentsMarked = true;
    }
  }

  submitUpdStudentAttendance() {
    this.attendanceService.pyUpdAttendance(this.sendServerStudentList).subscribe(data => {
      if (data.status === true) {
        this.attendanceUpdatedSuccessfully = true;
        this.attendanceDeletedSuccessfully = false;
      }
    },error => {this.router.navigate(['/error'])})
  }

  submitDelStudentAttendance() {
    console.log(this.facultyCourseDetailsForAtt , "FROM DEL DEL DEL");
    this.attendanceService.pyDelAttendance(this.facultyCourseDetailsForAtt).subscribe(data => {
      if(data.status === true) {
        this.attendanceDeletedSuccessfully = true;
        this.attendanceUpdatedSuccessfully = false;
      }
    },error => {this.router.navigate(['/error'])})
  }

}

class AttendanceView {
  constructor(
    public date: string
  ) { }
}