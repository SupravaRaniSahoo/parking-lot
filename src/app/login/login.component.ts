import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginAuthenticationService } from '../login-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidDetails:boolean = false;
  fieldTextType!: boolean;
  show: boolean = false;
  errorMessage:any;
  successMessage:any;

  credentials = {
    username: '',
    password: ''
  }

  constructor(private router: Router, private service: AuthenticationService, private auth: LoginAuthenticationService) { }

  ngOnInit(): void {
  }

  viewPassword() {
    this.show = !this.show;
    this.fieldTextType = !this.fieldTextType;

  }

  onSubmit(){
  //   this.errorMessage = null;
  //   this.successMessage = null;
  //  if(this.service.authenticate(this.username, this.password)){
  //    this.goToVehicleList();
  //    this.successMessage = "User logged in successfully";
  //    this.invalidDetails = false;
  //  }else{
  //    this.errorMessage = "User authentication failed";
  //    this.invalidDetails = true;
  //  }

  if((this.credentials.username != '' && this.credentials.password != '') && (this.credentials.username != null && this.credentials.password != null)){
    console.log("we have to submit the form to the server");

    this.auth.generateToken(this.credentials).subscribe(
      (response:any)=>{
         console.log(response.token);
         this.auth.loginUser(response.token);
         sessionStorage.setItem("uname", this.credentials.username);
        //  window.location.href = "/vehicles";
        this.goToVehicleList();
      },
      // error =>{

      // }
    )
  }else{
    console.log("fields are empty...");
  }

  }

  goToVehicleList(){
    this.router.navigate(['/vehicles']);
  }

  restForm(){
    (<HTMLFormElement>document.getElementById("Login")).reset();
  }

}
