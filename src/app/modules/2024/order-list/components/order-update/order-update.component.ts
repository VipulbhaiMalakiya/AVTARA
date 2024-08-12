import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../../Model/oder-model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-order-update',
    templateUrl: './order-update.component.html',
    styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent {

    private _issueMaster: any | undefined;
    isProceess: boolean = false;
    data: any;
    issueForm: any;


    statuses = [
        { value: 'Order_Receipt', label: 'Order Receipt' },
        { value: 'Confirmation', label: 'Confirmation' },
        { value: 'In_transit', label: 'In Transit' },
        { value: 'Delivered', label: 'Delivered' }
    ];

    availableStatuses: { value: string; label: string; }[] = [];

    get title(): string {
        return this._issueMaster ? "Update Status" : " Add Order";
    }

    set issuesMaster(value: any) {
        this._issueMaster = value;
        this.data = value;
        if (this._issueMaster) {
            this.issueForm.patchValue({
                status: this._issueMaster.orderStatus,
            });
            // this.issueForm.controls["departmentCode"].disable();
        }
    }


    constructor(
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        this.issueForm = this.formBuilder.group({
            status: [true, [Validators.required]]
        });

        this.setAvailableStatuses(this.issueForm.get('status').value);

        // Watch for status changes to update the available options
        this.issueForm.get('status').valueChanges.subscribe((value: string) => {
            this.setAvailableStatuses(value);
        });
    }
    setAvailableStatuses(currentStatus: string): void {
        const index = this.statuses.findIndex(status => status.value === currentStatus);

        if (index >= 0) {
            // Always show the current status
            this.availableStatuses = [this.statuses[index]];

            // Include the next status if it exists and has not been selected
            if (index + 1 < this.statuses.length) {
                const nextStatus = this.statuses[index + 1];
                if (nextStatus.value !== currentStatus) {
                    this.availableStatuses.push(nextStatus);
                }
            }
        } else {
            // If the current status is not found, reset available statuses
            this.availableStatuses = [];
        }
    }

    onCancel() {
        this.activeModal.dismiss();
    }


    onSubmit() {
        if (this.issueForm.valid) {
            this.activeModal.close(this.issueForm.value)
        } else {
            this.issueForm.controls['status'].markAsTouched();
        }
    }

    shouldShowError(controlName: string, errorName: string) {
        return this.issueForm.controls[controlName].touched && this.issueForm.controls[controlName].hasError(errorName);
    }
}
