import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL, ENV } from '../../DevProd'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  facultyCourseDetailsForAtt;
  url;
  env;
  urlViewAttendance;
  urlMarkAttendanceStudentList;
  urlMarkAttendance;
  urlDelUpdAttendanceStudentList;
  urlUpdAttendance;
  urlDelAttendance;

  constructor(private http: HttpClient) {
    this.facultyCourseDetailsForAtt = {};
    this.url = URL;
    this.env = ENV;
  }

  facultyCourseDetailsSetter(data) {
    this.facultyCourseDetailsForAtt = data;
  }

  facultyCourseDetailsGetter() {
    return this.facultyCourseDetailsForAtt;
  }

  pyViewAttendance(data: object) {
    this.urlViewAttendance = this.url + "ViewAttendance";
    return this.http.post<any>(this.urlViewAttendance, data).pipe(catchError(this.errorHandler));
  }

  pyMarkAttendanceGetStudentList(data:object) {
    this.urlMarkAttendanceStudentList = this.url + "MarkAttendanceStudentList";
    return this.http.post<any>(this.urlMarkAttendanceStudentList,data)
  }

  pyMarkAttendance1(data:object) {
    this.urlMarkAttendance = this.url + "MarkAttendance";
    return this.http.post<any>(this.urlMarkAttendance,data)
  }

  pyDelUpdAttendanceGetStudentList(data:object) {
    this.urlDelUpdAttendanceStudentList = this.url + "DelUpdAttendanceStudentList";
    return this.http.post<any>(this.urlDelUpdAttendanceStudentList,data)
  }

  pyUpdAttendance(data:object) {
    this.urlUpdAttendance = this.url + "UpdAttendance";
    return this.http.post<any>(this.urlUpdAttendance,data);
  }

  pyDelAttendance(data:object) {
    this.urlDelAttendance = this.url + "DelAttendance";
    return this.http.post<any>(this.urlDelAttendance,data);
  }

  errorHandler(error:HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }

}
