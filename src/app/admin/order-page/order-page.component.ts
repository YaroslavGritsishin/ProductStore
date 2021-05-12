import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

  customerId: string;
  customerid$: Subscription;

  constructor(
    private adminService: AdminService
  ) { }
  

  ngOnInit(): void {
      this.customerId = this.adminService.currentCustomerId;
      if(this.customerId){
        console.log('Заказы конкретного пользователя');
      }
      else{
        console.log('Все заказы');
      }   
  }

  ngOnDestroy(): void {
    this.adminService.currentCustomerId = '';
  }

}
