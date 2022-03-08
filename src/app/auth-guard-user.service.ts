import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserService implements CanActivate{

  constructor(private router: Router, private service: UserAuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.service.isUserLoggedIn())
     return true;

    this.router.navigate(['/login-user']);  
    return false;
}

}
