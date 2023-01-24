import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if(token){
      const cloneRequest = request.clone({
      headers: request.headers.set("Authorization", `Bearer ${token}`)
      });
      return next.handle(cloneRequest);
    }
    else{
      return next.handle(request);
    }
  }
}
