import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        OrderListComponent
    ],
    imports: [
        CommonModule,
        OrderListRoutingModule,
        SharedModule
    ]
})
export class OrderListModule { }
