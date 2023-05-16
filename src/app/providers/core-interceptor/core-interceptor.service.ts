import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { CoreHelperService } from '../core-helper/core-helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreInterceptorService implements HttpInterceptor {
  constructor(private inject : Injector, private coreHelpers: CoreHelperService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authService = this.coreHelpers.GetToken()
    let jwtToke = req.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: 'bearer', authService,
      }
    }) 
    return next.handle(jwtToke);
  }
}
