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

    get title(): string {
        return this._issueMaster ? "Edit Order" : " Add Order";
    }

    set issuesMaster(value: any) {
        this._issueMaster = value;
        this.data = value;
        if (this._issueMaster) {
            this.issueForm.patchValue({
                status: this._issueMaster.status,
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
