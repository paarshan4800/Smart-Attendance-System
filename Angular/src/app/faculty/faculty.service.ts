import { Injectable } from '@angular/core';
import { ENV, URL } from '../DevProd'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  url;
  env;
  urlFacultyHome;
  urlFacultyDetails;
  urlFacultyAttendanceShortage;

  constructor(private http: HttpClient) {
    this.env = ENV;
    this.url = URL;
  }

  pyFacultyHome(facultyData: object) {
    this.urlFacultyHome = this.url + "FacultyHome";
    return this.http.post<any>(this.urlFacultyHome, facultyData).pipe(catchError(this.errorHandler));
  }

  pyFacultyDetails(facultyData:object) {
    this.urlFacultyDetails = this.url + "FacultyDetails";
    return this.http.post<any>(this.urlFacultyDetails,facultyData).pipe(catchError(this.errorHandler))
  }

  pyAttendanceShortage(facultyData:object) {
    this.urlFacultyAttendanceShortage = this.url + "AttendanceShortage";
    return this.http.post<any>(this.urlFacultyAttendanceShortage,facultyData).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }
}
