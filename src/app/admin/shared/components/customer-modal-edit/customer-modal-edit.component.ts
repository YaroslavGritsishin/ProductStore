import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerData } from 'src/app/Models/interfaces';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-customer-modal-edit',
  templateUrl: './customer-modal-edit.component.html',
  styleUrls: ['./customer-modal-edit.component.scss']
})
export class CustomerModalEditComponent implements OnInit, OnDestroy {
@Input() customer: CustomerData;
@Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() onUpdate: EventEmitter<CustomerData> = new EventEmitter<CustomerData>();

update$: Subscription;
  constructor(
    private adminService: AdminService
  ) { }
  
  ngOnInit(): void {
  }
  close(){
    this.onClose.emit(false);
  }
  Update(name: string, address: string, discount: number){
    const result : CustomerData = {id: this.customer.id, name, address, discount }
    this.onUpdate.emit(result);
    this.adminService.updateCustomer(result).subscribe();
    this.onClose.emit(false);
  }

  ngOnDestroy(): void {
   if(this.update$){
     this.update$.unsubscribe();
   }
  }

}
