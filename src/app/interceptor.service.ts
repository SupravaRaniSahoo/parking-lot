import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(public service: VehicleService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.service.isLoading.next(true);

     return next.handle(req).pipe(
       finalize (
         () => {
           this.service.isLoading.next(false);
         }
       )
     )
  }
}
