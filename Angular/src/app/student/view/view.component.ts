import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  rollNo;
  studentDetails = [];

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router, private cookie: CookieService) {
    if (!this.cookie.check('rollNo')) {
      this.router.navigate(['**'])
    }
    else {
      this.route.params.subscribe(params => {
        this.rollNo = params['rollNo']
      })

      this.studentService.pyStudentDetails({ "rollNo": this.rollNo }).subscribe(data => {
        this.studentDetails = data;
        var x = this.studentDetails[6].split(" ");
        x.splice(0, 1);
        x.splice(3, 5);
        this.studentDetails[6] = x.join("-");
        this.studentDetails.splice(1, 1);
        console.log(this.studentDetails);
      }, error => { this.router.navigate(['/error']) })
    }
  }

  ngOnInit(): void {
  }

}
