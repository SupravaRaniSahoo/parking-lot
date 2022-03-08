import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from './Vehicle';
import { Details } from './Details';
import { environment } from 'src/environments/environment';
import { Role } from './Role';
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  public isLoading:BehaviorSubject<Boolean>  = new BehaviorSubject<Boolean>(true);

  private getURL = environment.apiURL+"getSomeVehicle";

  private postURL = environment.apiURL+"addSomeVehicle";

  private getIdURL = environment.apiURL+"getVehicle";

  private putURL = environment.apiURL+"updateVehicle";

  private postIdURL = environment.apiURL+"addVehicle";

  private putVURL = environment.apiURL+"updateVehicleStatus";

  private getByNameURL = environment.apisURL+"getAllVehicleDetailsByName";

  private getAllURL = environment.apisURL+"getAllVehicleDetails";

  private getDetailsURL = environment.apisURL+"getAllDetails";

  private getByStatus = environment.apiURL+"getVehicleByStatus";

  private getByName = environment.apiURL+"getVByName";

  private postSignUp = environment.apisURL+"addVehicleDetails";

  private getRole = "http://localhost:8080/login/getRole";

  private getLogin = "http://localhost:8080/login/getLogin";

  
  constructor(private http: HttpClient) { }

  getVehicleList(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.getURL}`);
  }

  getAllRole(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.getRole}`);
  }

  getAllUser(): Observable<Login[]>{
    return this.http.get<Login[]>(`${this.getLogin}`);
  }

  getVehicleListByStatus(): Observable<any>{
    return this.http.get(`${this.getByStatus}`);
  }

  getVehicleListByName(user:any): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.getByName}/${user}`);
  }

  createVehicle(vehicle: Vehicle): Observable<any>{
     return this.http.post(`${this.postURL}`, vehicle);
  }

  addVehicle(id: number, vehicle: Vehicle): Observable<any>{
     return this.http.post(`${this.postIdURL}/${id}`, vehicle);
  }

  getVehicleById(id: number): Observable<Vehicle>{
    return this.http.get<Vehicle>(`${this.getIdURL}/${id}`);
  } 

  updateVehicleDetails(id: number, vehicle: Vehicle): Observable<any>{
    return this.http.put(`${this.putURL}/${id}`, vehicle);
  }

  updateVehicleStatusDetails(id: number, vehicle: Vehicle): Observable<any>{
    return this.http.put(`${this.putVURL}/${id}`, vehicle);
  }

  deleteVehicleById(id: number): Observable<any>{
    return this.http.delete(`${this.putVURL}/${id}`);
  } 

  getVehicleDetailsByName(name: string): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.getByNameURL}/${name}`);
  } 
  
  getAllVehicleList(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.getAllURL}`);
  }

  getDetailsList(): Observable<Details[]>{
    return this.http.get<Details[]>(`${this.getDetailsURL}`);
  }

  addDetailsForSignUp(details: Details): Observable<any>{
    return this.http.post(`${this.postSignUp}`, details);
  }

}
