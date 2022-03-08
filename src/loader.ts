// import { Injectable } from "@angular/core";
// import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Observable, tap } from "rxjs";
// import { VehicleService } from "./app/vehicle.service";

// @Injectable()
// export class Loader implements HttpInterceptor{
//     constructor(private service: VehicleService){
        
//     }
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         throw new Error("Method not implemented.");
//     }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(req).pipe(
    //       tap(event => {
    //           this.service.next(true);
    //           if(event.type == HttpEventType.Response){
    //               if(event.status == 200){
    //                   this.service.next(false);
    //               }
    //           }
    //       })
    //     )
    // }
//}