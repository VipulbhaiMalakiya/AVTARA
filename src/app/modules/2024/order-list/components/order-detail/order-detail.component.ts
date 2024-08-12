import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../Model/oder-model';
import { OrderService } from '../../../Service/order.service';


@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    isProceess: boolean = true;
    data: Order[] = [];
    order: Order | undefined;

    constructor(private route: ActivatedRoute, private orderService: OrderService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.loadOrders(id);
            }
        });
    }

    loadOrders(id: any): void {
        this.orderService.getOrderById(id).subscribe(order => {
            this.order = order;
        });
    }
}
