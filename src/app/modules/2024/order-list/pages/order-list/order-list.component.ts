import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Order } from '../../../Model/oder-model';
import { OrderService } from '../../../Service/order.service';
import { ApiService } from 'src/app/_api/rxjs/api.service';
import { OrderUpdateComponent } from '../../components/order-update/order-update.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';




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

    constructor(private orderService: OrderService, private apiService: ApiService,
        private cd: ChangeDetectorRef,
        private modalService: NgbModal,
        private toastr: ToastrService,
    ) { }


    ngOnInit(): void {
        this.loadOrders();
        this.fatchData();
    }


    fatchData() {
        this.isProceess = true;
        this.masterName = "/auto-reply";
        this.subscription = this.apiService.getAll(this.masterName).pipe(take(1)).subscribe(data => {
            if (data) {
                this.data = data.data;
                this.count = this.data.length;
                this.isProceess = false;
                this.cd.detectChanges();
            }

        }, error => {
            this.isProceess = false;
        })
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

    onEdit(dataItem: any) {
        this.isProceess = true;
        const modalRef = this.modalService.open(OrderUpdateComponent, { size: "sm" });
        if (modalRef) {
            this.isProceess = false;
        }
        else {
            this.isProceess = false;
        }
        var componentInstance = modalRef.componentInstance as OrderUpdateComponent;
        componentInstance.issuesMaster = dataItem;
        modalRef.result.then((data: any) => {
            if (data) {
                var model: any = {
                    id: '',
                    status: data.status,
                }
                this.masterName = `/auto-reply`;
                let updateData: any = {
                    url: this.masterName,
                    model: model
                }
                this.isProceess = true;
                this.subscription = this.apiService.update(updateData).pipe(take(1)).subscribe(res => {
                    this.toastr.success(res.message);
                    this.isProceess = false;
                    this.fatchData();
                }, error => {
                    this.toastr.error(error.error.message);
                    this.isProceess = false;
                });
            }
        }).catch(() => { });
    }

}
