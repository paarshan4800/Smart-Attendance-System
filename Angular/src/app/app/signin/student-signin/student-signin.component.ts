import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student-signin',
  templateUrl: './student-signin.component.html',
  styleUrls: ['./student-signin.component.css']
})
export class StudentSigninComponent implements OnInit {

  public studentCredentials = new StudentSignIn('','');
  public wrongCredentials;

  constructor(private appService:AppService,private router:Router,private cookie:CookieService) { }

  ngOnInit(): void {
    this.wrongCredentials = false;
    if(this.cookie.check('rollNo')) {
      this.router.navigate(['/student/home',this.cookie.get('rollNo')]);
    }
  }
  SubmitStudentSignIn() {
    this.appService.pyStudentSignIn(this.studentCredentials).subscribe(data => {
      if(data.status === false) {
        this.wrongCredentials = true;
      }
      else {
        this.cookie.set('rollNo',this.studentCredentials.rollNo,null,'/');
        this.router.navigate(['/student/home',this.studentCredentials.rollNo])
      }
    },
    error => {
      this.router.navigate(['/error'])
    }
    )
  }

}

export class StudentSignIn {
  constructor(
    public rollNo : string,
    public password : string
  ) {}
}