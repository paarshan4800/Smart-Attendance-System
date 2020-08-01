import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  rollNo;

  constructor(private route: ActivatedRoute, private cookie: CookieService, private router: Router) {
    this.route.params.subscribe(params => {
      this.rollNo = params['rollNo']
    })
  }

  ngOnInit(): void {

  }

  SignOut() {
    if (this.cookie.check('rollNo')) {
      this.cookie.delete('rollNo','/');
    }
    
    this.router.navigate['../../'];
  }
}
