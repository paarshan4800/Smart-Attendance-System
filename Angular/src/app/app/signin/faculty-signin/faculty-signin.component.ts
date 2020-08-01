import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-faculty-signin',
  templateUrl: './faculty-signin.component.html',
  styleUrls: ['./faculty-signin.component.css']
})
export class FacultySigninComponent implements OnInit {

  public facultyCredentials = new FacultySignIn('','');
  wrongCredentials;

  constructor(private appService:AppService,private router:Router,private cookie:CookieService) { }

  ngOnInit(): void {
    this.wrongCredentials = false;
    if(this.cookie.check('facultyId')) {
      this.router.navigate(['/faculty/home',this.cookie.get('facultyId')]);
    }
  }

  SubmitFacultySignIn() {
    this.appService.pyFacultySignIn(this.facultyCredentials).subscribe(data => {
      if(data.status === false) {
        this.wrongCredentials = true;
      }
      else {
        this.cookie.set('facultyId',this.facultyCredentials.facultyId,null,'/');
        this.router.navigate(['/faculty/home',this.facultyCredentials.facultyId])
      }
    })
  }

}

export class FacultySignIn{
  constructor(
    public facultyId : string,
    public password : string
  ) {}
}