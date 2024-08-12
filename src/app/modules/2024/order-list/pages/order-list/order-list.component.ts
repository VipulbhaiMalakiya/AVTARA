import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../../Model/oder-model';
import { OrderService } from '../../../Service/order.service';




@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {


    isProceess: boolean = true;
    masterName?: any;
    subscription?: Subscription;
    term: any;
    data: Order[] = [];
    page: number = 1;
    count: number = 0;
    tableSize: number = 7;
    tableSizes: any = [3, 6, 9, 12];

    constructor(private orderService: OrderService) { }


    ngOnInit(): void {
        this.loadOrders();
    }
    loadOrders(): void {
        this.orderService.getOrders().subscribe(orders => this.data = orders);
    }




    calculateIndex(page: number, index: number): number {
        return (page - 1) * this.tableSize + index + 1;
    }

    onTableDataChange(event: any) {
        this.page = event;
    }

}
