import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewOrderFilterPipe } from 'src/app/_helpers/new-orderlist';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        OrderListComponent, NewOrderFilterPipe
    ],
    imports: [
        CommonModule,
        OrderListRoutingModule,
        SharedModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class OrderListModule { }
