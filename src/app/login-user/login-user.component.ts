import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthenticationService } from '../login-authentication.service';
import { UserAuthenticationService } from '../user-authentication.service';
import { Vehicle } from '../Vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  // username: string = '';
  // password: string = '';
  errorMessage:any;
  successMessage:any;
  invalidLogin = false;
  loginSuccess = false;
  fieldTextType!: boolean;
  show: boolean = false;
  name:any = localStorage.getItem('name');
  credentials = {
    username: '',
    password: ''
  }

  constructor(private router: Router, private service: UserAuthenticationService, private services: VehicleService,private routes: ActivatedRoute, private auth: LoginAuthenticationService) { }

  ngOnInit(): void {
  
  }


  viewPassword() {
    this.show = !this.show;
    this.fieldTextType = !this.fieldTextType;

  }


 getDetails(user:any){
  // this.errorMessage = null;
  // this.successMessage = null;
  // this.service.authenticate(this.username, this.password).subscribe((result)=> {
  //   this.invalidLogin = false;
  //   this.loginSuccess = true;
  //   if(this.loginSuccess){
  //   this.successMessage = 'User logged in successfully';
  //   this.router.navigate(['search',user]);
  //   }else{
  //   this.errorMessage = 'User authentication failed';
  //   this.router.navigate(['/login-user']);
  //   }
  //   // this.goToSearch;
  //   sessionStorage.setItem('name', this.username);
  // });      

  if((this.credentials.username != '' && this.credentials.password != '') && (this.credentials.username != null && this.credentials.password != null)){
    console.log("we have to submit the form to the server");

    this.auth.generateToken(this.credentials).subscribe(
      (response:any)=>{
         console.log(response.token);
         this.auth.loginUser(response.token);
         this.router.navigate(['search',user]);
      },
      // error =>{

      // }
    )
  }else{
    console.log("fields are empty...");
  }
}

  // goToSearch(this.name){
  //   this.router.navigate(['search', sessionStorage.getItem('name')]);
  // }
 

}
