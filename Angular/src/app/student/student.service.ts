import { Injectable } from '@angular/core';
import {ENV,URL} from '../DevProd'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  env;
  url;
  urlStudentHome;
  urlStudentDetails;

  constructor(private http:HttpClient) {
    this.env = ENV;
    this.url = URL;
   }

   pyStudentHome(studentData:object) {
     this.urlStudentHome = this.url + "StudentHome"
     return this.http.post<any>(this.urlStudentHome,studentData)
   }

   pyStudentDetails(studentData:object) {
      this.urlStudentDetails = this.url + "StudentDetails"
      return this.http.post<any>(this.urlStudentDetails,studentData)
   }
}
