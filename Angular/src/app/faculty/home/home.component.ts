import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '../faculty.service';
import { AttendanceService } from '../attendance/attendance.service';
import { MarkComponent } from '../attendance/mark/mark.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  facultyId;
  subjectDetails = [];
  attendanceShortageDetails = { "courseId": "", "studentDetails": [] };
  noAttendanceShortage;

  constructor(
    private route: ActivatedRoute,
    private facultyService: FacultyService,
    private attendanceService: AttendanceService,
    private router: Router,
    private cookie: CookieService
  ) {
    if (!this.cookie.check('facultyId')) {
      this.router.navigate(['**'])
    }
    else {
      this.route.params.subscribe(params => {
        this.facultyId = params['facultyId']
        console.log(this.facultyId);
      })

      this.facultyService.pyFacultyHome({ "facultyId": this.facultyId }).subscribe(data => {
        this.subjectDetails = data;
      }, error => { this.router.navigate(['/error']) })
    }
  }

  ngOnInit(): void {
  }

  clickAttendanceShortage(facultyData: object) {
    this.facultyService.pyAttendanceShortage(facultyData).subscribe(data => {
      this.attendanceShortageDetails = data;
      if (this.attendanceShortageDetails.studentDetails.length === 0) {
        this.noAttendanceShortage = true;
      }
      else {
        this.noAttendanceShortage = false;
      }
    }, error => { this.router.navigate(['/error']) })
  }

  clickMark(facultyCourseDetails: object) {
    this.cookie.set('facultyMark', this.facultyId, null, '/');
    this.attendanceService.facultyCourseDetailsSetter(facultyCourseDetails);
    this.router.navigate(['../../attendance/mark', this.facultyId], { relativeTo: this.route })
  }

  clickDelUpd(facultyCourseDetails: object) {
    this.cookie.set('facultyDelUpd', this.facultyId, null, '/');
    this.attendanceService.facultyCourseDetailsSetter(facultyCourseDetails);
    this.router.navigate(['../../attendance/delupd', this.facultyId], { relativeTo: this.route })
  }

  clickViewAtt(facultyCourseDetails: object) {
    this.cookie.set('facultyView', this.facultyId, null, '/');
    this.attendanceService.facultyCourseDetailsSetter(facultyCourseDetails);
    this.router.navigate(['../../attendance/viewatt', this.facultyId], { relativeTo: this.route })
  }


}
