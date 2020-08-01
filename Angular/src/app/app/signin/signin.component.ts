import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  StudentImgSrc : string;
  FacultyImgSrc : string;

  constructor(private router:Router,private route:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.StudentImgSrc = "../../assets/images/student_logo.png";
    this.FacultyImgSrc = "../../assets/images/faculty_logo.png";
  }

  StudentImgMouseOver() {
    this.StudentImgSrc = "../../assets/images/student_logo_hover.png";
  }
  StudentImgMouseOut() {
    this.StudentImgSrc = "../../assets/images/student_logo.png";
  }
  FacultyImgMouseOver() {
    this.FacultyImgSrc = "../../assets/images/faculty_logo_hover.png";
  }
  FacultyImgMouseOut() {
    this.FacultyImgSrc = "../../assets/images/faculty_logo.png";
  }
  clickStudentImg() {
    this.router.navigate(['student'],{relativeTo:this.route})
  }
  clickFacultyImg() {
    this.router.navigate(['faculty'],{relativeTo:this.route})
  }
}
