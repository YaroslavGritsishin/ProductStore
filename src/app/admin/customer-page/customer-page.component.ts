import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerData } from 'src/app/Models/interfaces';
import { AdminService } from '../shared/services/admin.service'

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit, OnDestroy {
  data: CustomerData[];
  customers$ : Subscription;
  
  constructor(
    private adminService: AdminService
  ) { }
  

  ngOnInit(): void {

    this.getCustomers();
    
  }

  getCustomers(){
    this.customers$ = this.adminService.getAllCustomers().subscribe(resp =>{
      this.data = resp;
    });
  }

  _delete(custmerId: string){
    const currentItem = this.data.find(x => x.id === custmerId);
    const newData = this.data.filter(x => {
      if(x !== currentItem)
        return x;
    })
    this.data = newData;
  }

  _update(customer: CustomerData){
    this.data.forEach(currentCustomer => {
      if(currentCustomer.id === customer.id){
        currentCustomer.address = customer.address;
        currentCustomer.name = customer.name;
        currentCustomer.discount = customer.discount;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.customers$){
      this.customers$.unsubscribe();
    }
  }

}
