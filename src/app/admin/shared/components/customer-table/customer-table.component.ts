import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerData } from 'src/app/Models/interfaces';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit, OnDestroy {

 @Input() customerData: CustomerData[];
 @ViewChildren('tableRef') tableRef : ElementRef;
 @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
 @Output() onUpdate: EventEmitter<CustomerData> = new EventEmitter<CustomerData>();
 @HostListener('click', ['$event.target']) onClick($event: any){
     const indexDelete = this.getIndexOfCurrentRow($event, 'iconDelete');
     if(indexDelete || indexDelete === 0){
      this.onDelete.emit(this.getCustomerIdOfCurrentRow($event, 'iconDelete'));
     }
     const indexEdit = this.getIndexOfCurrentRow($event, 'iconEdit');
     if(indexEdit || indexEdit === 0){
      this.currentCustomer = this.customerData[indexEdit];
     }
     const indexList = this.getIndexOfCurrentRow($event, 'iconList');
     if(indexList || indexList === 0){
       this.adminServeice.setCustomerId(this.getCustomerIdOfCurrentRow($event, 'iconList'));
     }
     
      // this.adminServeice.setCustomerId();
      
     
 }
 IsEdit:boolean = false;
 currentCustomer: CustomerData = {name: "Имя", address:"Адрес доставки", discount: 50};
 customerId$ : Subscription;
 
 constructor(
    private adminServeice: AdminService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
  }

  Close(visible: boolean){
    this.IsEdit = visible;
  }

getCustomerIdOfCurrentRow($event: any, className: string): string{
  let result: string;
    if($event.classList.contains(className)){
      const currentRow = $event.parentElement.parentElement.parentElement;
      const allTableRows = [...this.tableRef["_results"][0].nativeElement.rows];
      allTableRows.forEach((row,index)=> {
        if(currentRow == row){
         result = allTableRows[index].cells[0].innerHTML;
        }
      });
    }
    return result;
  }

  getIndexOfCurrentRow($event: any, className: string): number{
    let result: number;
      if($event.classList.contains(className)){
        const currentRow = $event.parentElement.parentElement.parentElement;
        const allTableRows = [...this.tableRef["_results"][0].nativeElement.rows];
        allTableRows.forEach((row,index)=> {
          if(currentRow == row){
            result = index - 1;
          }
        });
      }
      return result;
    }

    redirectToOrdersList(){
      this.customerId$ = this.adminServeice.getCustomerId()
      .subscribe(result => {
        if(result){
          this.adminServeice.currentCustomerId = result;
          this.router.navigate(['/admin/order']);
        }
      });
    }


  next(customer: CustomerData){
    this.onUpdate.emit(customer);
  }

  ngOnDestroy(): void {
    if(this.customerId$){
      this.customerId$.unsubscribe();
    }
  }

}
