import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {

  constructor(private router: Router, private service: UserAuthenticationService) { }

  ngOnInit(): void {
    this.service.logOut();
    this.router.navigate(['/home']);
  }

}
