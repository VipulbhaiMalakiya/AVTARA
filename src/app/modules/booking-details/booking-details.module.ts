import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDetailsRoutingModule } from './booking-details-routing.module';
import { BookingDetailsListComponent } from './pages/booking-details-list/booking-details-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { BookingFilterPipe } from 'src/app/_helpers/booking-info';


@NgModule({
  declarations: [
    BookingDetailsListComponent,
    BookingFilterPipe
  ],
  imports: [
    CommonModule,
    BookingDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class BookingDetailsModule { }