import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '../faculty.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  facultyId;
  facultyDetails = [];

  constructor(private route: ActivatedRoute, private facultyService: FacultyService, private cookie: CookieService, private router: Router) {

    if (!this.cookie.check('facultyId')) {
      this.router.navigate(['**'])
    }
    else {
      this.route.params.subscribe(params => {
        this.facultyId = params['facultyId']
      })


      this.facultyService.pyFacultyDetails({ "facultyId": this.facultyId }).subscribe(data => {
        this.facultyDetails = data;
      }, error => { this.router.navigate(['/error']) })
    }
  }

  ngOnInit(): void {
  }



}
