import { Injectable,OnInit, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {StudentSignIn} from './signin/student-signin/student-signin.component'
import {FacultySignIn} from './signin/faculty-signin/faculty-signin.component'
import {ENV,URL} from '../DevProd'
import {catchError} from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  env;
  url;
  urlStudentSignIn;
  urlFacultySignIn;

  constructor(private http:HttpClient) {
    this.env = ENV;
    this.url = URL;
   }

  ngOnInit(): void {
    
  }
  
  pyStudentSignIn(credentials:StudentSignIn) {
    this.urlStudentSignIn = this.url + "StudentSignIn";
    return this.http.post<any>(this.urlStudentSignIn,credentials).pipe(catchError(this.errorHandler));
  }
    errorHandler(error:HttpErrorResponse) {
      return throwError({"status":false,"msg":"Server Error"});
    }


  pyFacultySignIn(credentials:FacultySignIn) {
    this.urlFacultySignIn = this.url + "FacultySignIn";
    return this.http.post<any>(this.urlFacultySignIn,credentials);
  }
}
