import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ACCESS_TOKEN_KEY } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqClone = req.clone({
            setHeaders: {
                //'Content-Type' : 'application/json; charset=utf-8;',
                //'Accept'       : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
              },
        });
        
        return next.handle(reqClone);
    }

}