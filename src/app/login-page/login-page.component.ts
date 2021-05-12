import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from '../Models/interfaces';
import { AuthService } from '../services/auth.service'



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  stream$: Subscription;
  constructor(
    public authService: AuthService,
    private router : Router
    ) { }

  ngOnInit( ): void {
    this.form = new FormGroup({
      email: new FormControl(null,[
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ])

    })
  }


  login(){
    if(this.form.invalid){
      return;
    }
    else{
      const body: Login = {
        Email: this.form.value.email,
        Password: this.form.value.password
      };
      this.stream$ = this.authService.login(body).subscribe(resp => {
        if(resp.access_token){
          if(this.authService.getRole() === "Admin"){
            this.router.navigate(['/admin/']);
          }
           if(this.authService.getRole() === "User"){
            this.router.navigate(['/']);
          }
        }
      });
    } 
  }

  ngOnDestroy(): void {
    if(this.stream$){
      this.stream$.unsubscribe();
    }
    
  }
  
}
