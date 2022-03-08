import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { threadId } from 'worker_threads';
import { AuthenticationService } from './authentication.service';
import { LoginAuthenticationService } from './login-authentication.service';
import { UserAuthenticationService } from './user-authentication.service';
import { Vehicle } from './Vehicle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'parking-lot-system';
  @ViewChild('agGrid') agGrid: any;
  getName = sessionStorage.getItem('uname')
  name!:string;
  spinnerType!: string;
  spinnerName!: string;
  // getUserName = sessionStorage.getItem('username');

   style:any = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto'
   };

  constructor(public service:AuthenticationService, public userService:UserAuthenticationService, private spinner: NgxSpinnerService, public loginService: LoginAuthenticationService){
    // this.spinnerName = 'sp1';
    // this.spinnerType = 'ball-fussion';

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  ngOnInit(): void {
  }

  isDarkTheme = false;
  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme;
  }

  fillLarge() {
    this.setWidthAndHeight('100%', '100%');
  }

  fillMedium() {
    this.setWidthAndHeight('60%', '60%');
  }

  fillExact() {
    this.setWidthAndHeight('400px', '400px');
  }

  setWidthAndHeight(width:any, height:any) {
    this.style = {
        width: width,
        height: height
    };
}

}
