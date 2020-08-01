import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  facultyId;

  constructor(private route:ActivatedRoute,private cookie:CookieService,private router:Router) {
    this.route.params.subscribe(params => {
      this.facultyId = params['facultyId']
    })
   }

  ngOnInit(): void {
  }

  SignOut() {
    console.log("MU");
    if (this.cookie.check('facultyId')) {
      
      this.cookie.delete('facultyId','/');
      console.log(this.cookie.get('facultyId'));
    }
    
    this.router.navigate['../../'];
  }

}
