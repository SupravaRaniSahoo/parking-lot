import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Vehicle } from './Vehicle';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService implements OnInit{

  vehicle: Vehicle = new Vehicle(); 
  vehicles!: Vehicle[];
  vehiclesJsonData: any;
  vehiclesObjectData: any;
  vehiclesData: any;
  user:any = '';
  name:any;

  public username!: String;
  public password!: String;

  constructor(private service: VehicleService, private routes: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

  }
  
  authenticate(username: string, password: string) {
    return this.http.get(`http://localhost:8080/detailsAPI/getAllDetails`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.successfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  successfulLogin(username: string, password: string) {
    sessionStorage.setItem('username', username)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

}
