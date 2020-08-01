import { Component, OnInit, HostListener } from '@angular/core';
import { AttendanceService } from '../attendance.service'
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-viewatt',
  templateUrl: './viewatt.component.html',
  styleUrls: ['./viewatt.component.css']
})
export class ViewattComponent implements OnInit {

  facultyCourseDetailsForAtt;
  viewAtt = new AttendanceView('', '1');
  showStudentList;
  studentList;
  noClassesOnThatDay;
  facultyId;
  noDateGiven;

  constructor(private attendanceService: AttendanceService, private router: Router, private route: ActivatedRoute, private cookie: CookieService) {


    this.route.params.subscribe(params => {
      this.facultyId = params['facultyId']
    })

    if (this.cookie.check('facultyView') === false) {
      this.router.navigate(['../../../signin/faculty'])
    }

    this.facultyCourseDetailsForAtt = this.attendanceService.facultyCourseDetailsGetter();
  }

  ngOnInit(): void {
    this.showStudentList = false;
    this.noDateGiven = false;
  }

  ngOnDestroy(): void {

  }

  @HostListener('window:beforeunload') goToPage() {
    if (this.cookie.check('facultyView') === true) {
      this.cookie.delete('facultyView', '/');
    }
  }

  submitViewAtt() {
    if (this.viewAtt.date === "") {
      this.noDateGiven = true;
    }
    else {
      this.noDateGiven = false;
      this.facultyCourseDetailsForAtt['date'] = this.viewAtt.date;
      this.facultyCourseDetailsForAtt['hours'] = this.viewAtt.hours;
      console.log(this.facultyCourseDetailsForAtt)
      this.attendanceService.pyViewAttendance(this.facultyCourseDetailsForAtt).subscribe(data => {
        if (data.status === false) {
          this.showStudentList = true;
          this.noClassesOnThatDay = true;
        }
        else {
          this.showStudentList = true;
          this.noClassesOnThatDay = false;
          this.studentList = data.studentList;
          for (var i = 0; i < this.studentList.length; i++) {
            if (this.studentList[i][1] > 0) {
              this.studentList[i].push(true);
            }
            else {
              this.studentList[i].push(false);
            }
          }
        }
      },
      error => {
        this.router.navigate(['/error'])
      })
    }
  }
}

class AttendanceView {
  constructor(
    public date: string,
    public hours: string
  ) { }
}