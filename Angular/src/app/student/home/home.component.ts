import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  rollNo;
  attendanceDetails = [];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private cookie: CookieService,
    private router: Router
  ) {
    if (!this.cookie.check('rollNo')) {
      this.router.navigate(['**']);
    } else {
      this.route.params.subscribe((params) => {
        this.rollNo = params['rollNo'];
      });

      this.studentService.pyStudentHome({ rollNo: this.rollNo }).subscribe(
        (data) => {
          this.attendanceDetails = data;
          console.log(data, 'ETST');
          for (var i = 0; i < this.attendanceDetails.length; i++) {
            if (
              this.attendanceDetails[i][2] + this.attendanceDetails[i][3] ===
              0
            ) {
              this.attendanceDetails[i].push(
                "You haven't attended any classes."
              );
              this.attendanceDetails[i].push(false);
            } else if (this.attendanceDetails[i][4] === 75) {
              this.attendanceDetails[i].push('You are on track.');
              this.attendanceDetails[i].push(false);
            } else {
              var x =
                (this.attendanceDetails[i][2] /
                  (this.attendanceDetails[i][2] +
                    this.attendanceDetails[i][3])) *
                100;
              var y =
                Math.abs(75 - x) *
                  ((this.attendanceDetails[i][2] +
                    this.attendanceDetails[i][3]) /
                    100) +
                1;
              var present = this.attendanceDetails[i][2];
              var absent = this.attendanceDetails[i][3];
              var percent = this.attendanceDetails[i][4];

              console.log(x);
              console.log(y);
              if (this.attendanceDetails[i][4] < 75) {
                var count = 0;
                while (percent < 75) {
                  present++;
                  percent = (present / (present + absent)) * 100;
                  console.log("COUTN FOR")
                  count++;
                }
                this.attendanceDetails[i].push(
                  'You have to attend next ' + count + ' classes.'
                );
                this.attendanceDetails[i].push(true);
              } else {
                var count = 0;
                while (percent > 75) {
                  absent++;
                  percent = (present / (present + absent)) * 100;
                  console.log("COUTN FOR")
                  count++;
                }
                this.attendanceDetails[i].push(
                  'You can bunk next ' + (count-1) + ' classes.'
                );
                this.attendanceDetails[i].push(false);
              }
            }
          }
        },
        (error) => {
          this.router.navigate(['/error']);
        }
      );
    }
  }

  ngOnInit(): void {}
}
