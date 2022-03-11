import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginAuthenticationService } from "./login-authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  
    constructor(private service: LoginAuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token: string|null = this.service.getToken();

        console.log("INTERCEPTOR: ",token);

        // var headers_object = new HttpHeaders();
        // headers_object.append('Content-Type', 'application/json');
        // headers_object.append("Access-Control-Allow-Origin", "*");
        // headers_object.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        // headers_object.append("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        // headers_object.append("Access-Control-Allow-Credentials", "true");
        // headers_object.append("Authorization", "Bearer "+token);

        if(token){
            const newReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer "+token)
            });
            return next.handle(newReq);
        }

        return next.handle(req);
    }
    
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];