import { registerLocaleData } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { RegCustomer } from '../Models/interfaces';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  errorStream$: Subscription;
  registerStream$:Subscription;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      address: new FormControl(null, [
        Validators.required
      ])
    });
  }

  register(){
    if(this.form.invalid){
      return
    }
    const customer: RegCustomer =  
    {
      Name: this.form.value.name,
      Address: this.form.value.address,
      Discount: 10,
      Account:
          {
            Email: this.form.value.email,
            Password: this.form.value.password,
          }
    }
    this.registerStream$ = this.authService.registry(customer).subscribe(resp =>{
      if(resp){
        this.router.navigate(['/login']);
      }
    });
    // this.errorStream$ =  this.authService.error$.asObservable().subscribe(resp =>{
    //   console.log(resp);
    // });
    
    // this.router.navigate(['/login'])
  }

  ngOnDestroy(): void {
      if(this.registerStream$){
        this.registerStream$.unsubscribe();
      }
      if(this.errorStream$){
        this.errorStream$.unsubscribe();
      }
    
    
  }
}


