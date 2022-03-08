import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmValidator } from '../confirm.validator';
import { Details } from '../Details';
import { UserAuthenticationService } from '../user-authentication.service';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  details: Details = new Details();
  value:any = this.details
  alert:boolean =false;
  selectedOption!: string;
  fieldTextType!: boolean;
  show: boolean = false;
  
  options = [
    { name: "bike", value: 1 },
    { name: "car", value: 2 }
  ]

  constructor(private router: Router, private service: VehicleService,private routes: ActivatedRoute, private fb: FormBuilder) {  
  }

  registrationForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  submitted = false;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmValidator('password', 'confirm_password')
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  viewPassword() {
    this.show = !this.show;
    this.fieldTextType = !this.fieldTextType;
  }


  onSubmit(){
    console.log(this.details);
    this.saveVehicleDetails();
    this.alert = true;
  }

  saveVehicleDetails(){
    this.service.addDetailsForSignUp(this.details).subscribe(
      data =>{console.log(data);
        this.goToVehicleList();
      }
    );
  }

  closeAlert(){
    this.alert = false;
  }

  goToVehicleList(){
    this.router.navigate(['/login-user']);
  }

}
