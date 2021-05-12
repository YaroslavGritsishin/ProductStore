import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { CustomerTableComponent } from './shared/components/customer-table/customer-table.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { CustomerModalEditComponent } from './shared/components/customer-modal-edit/customer-modal-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AdminHeaderComponent } from './shared/components/admin-header/admin-header.component';
import { AuthGuard } from '../admin/shared/services/auth.guard';
import { OrderPageComponent } from './order-page/order-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminCardComponent } from './shared/components/admin-card/admin-card.component';


@NgModule({
    declarations:[
        AdminLayoutComponent,
        CustomerTableComponent,
        CustomerPageComponent,
        CustomerModalEditComponent,
        AdminHeaderComponent,
        OrderPageComponent,
        ProductPageComponent,
        AdminCardComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        RouterModule.forChild([
            {path: '', component: AdminLayoutComponent, children: [
                {path: '', redirectTo: 'customer', pathMatch: 'full', canActivate: [AuthGuard]},
                {path: 'customer', component: CustomerPageComponent, canActivate: [AuthGuard]},
                {path: 'order', component: OrderPageComponent, canActivate: [AuthGuard]},
                {path: 'product', component: ProductPageComponent, canActivate: [AuthGuard]}    
            ]}
        ])
    ],
    exports:[RouterModule],
    providers: [AuthGuard]
})
export class AdminModule{

}