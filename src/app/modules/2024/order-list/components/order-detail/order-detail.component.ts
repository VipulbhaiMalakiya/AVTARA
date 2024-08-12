import { Component, Input, OnInit } from '@angular/core';
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
            console.log(this.order);

        });
    }

    steps = [
        { status: 'Confirmation', icon: 'las la-check-circle' },
        { status: 'Sales', icon: 'las la-user-tie' },
        { status: 'In Transit', icon: 'las la-shuttle-van' },
        { status: 'Delivery', icon: 'las la-thumbs-up' }
    ];
    getStepClass(status: string): string {
        const trackStatus = this.order?.trackStatus;
        const steps = this.steps ?? [];

        if (trackStatus === status) {
            return 'active'; // Current step
        } else if (steps.length > 0) {
            const currentStepIndex = steps.findIndex(step => step.status === trackStatus);
            const targetStepIndex = steps.findIndex(step => step.status === status);

            if (currentStepIndex !== -1 && targetStepIndex !== -1) {
                // Mark steps before the current step as 'finish'
                if (targetStepIndex < currentStepIndex) {
                    return 'finish';
                }
                // Mark steps after the current step as 'inactive'
                else if (targetStepIndex > currentStepIndex) {
                    return 'inactive';
                }
            }
        }
        return 'inactive'; // Default for steps that don't match
    }






}
