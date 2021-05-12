import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';



@Injectable()
export class AuthGuard implements CanActivate{
     constructor(
         private authService: AuthService,
         private router: Router
         
     ){}

    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        if(this.authService.isAuthenticated()){
            const role = this.authService.getRole()
            if(this.authService.isAuthenticated() && role === "Admin"){
                return true;
               }
               else{
                this.router.navigate(['/'], { queryParams: {enterLikeAndim: true } });
               }
        }
        else{
            this.authService.logout();
            this.router.navigate(['/'], { queryParams: {LoginAgain: true } });
        }

    }

}