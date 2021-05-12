import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService : AuthService  
    ) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      const role = this.authService.getRole();
      if( role ==='Admin'){
        this.IsAutenticate = true;
        this.isAdmin = true;
      }
      else{
        this.IsAutenticate = true;
      }
    }
    
  }
  IsAutenticate: boolean = false;
  isAdmin: boolean = false;
  
  Logout(){
    this.authService.logout();
    this.IsAutenticate =  this.authService.isAuthenticated();
  }
}
