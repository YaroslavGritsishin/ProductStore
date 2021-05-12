import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AUTH_API_URL } from '../Models/app-injection-token';
import { Token } from '../Models/Token';
import {RegCustomer} from '../Models/interfaces';


export const ACCESS_TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( 
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    @Inject(AUTH_API_URL) private authUrl: string

  ) { }

  public error$: Subject<string> = new Subject<string>();

  login(body:{ Email: string, Password:string}): Observable<Token>{
    return this.http.post<Token>(`${this.authUrl}auth/login`, body).pipe(
      tap((token) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  logout(){
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }

  registry(customer : RegCustomer): Observable<string>{
    return this.http.post<RegCustomer>(`${this.authUrl}auth/register`, customer).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }
   getParams(): any[]{
     const token = localStorage.getItem(ACCESS_TOKEN_KEY);
     if(token){
       return this.jwtHelper.decodeToken(token);
     }
   }

   getRole():string{
      return this.getParams()['role'];
   }
   
   getId():string{
    return this.getParams()['sub'];
 }

 private errorHandler(error: HttpErrorResponse){
    const {message} = error.error;
    this.error$.next(message);
    return throwError(error);
 }
 

}
