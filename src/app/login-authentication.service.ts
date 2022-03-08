import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {

  private url = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  generateToken(ceredentials : any){
     return this.http.post(`${this.url}/authenticate`, ceredentials)
  }

  loginUser(token:any){
     localStorage.setItem("token", token)
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == undefined || token == '' || token == null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("token");
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }
}
