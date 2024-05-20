import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
    data:any;


    set catalog(value: any) {

        this.data = value;
        console.log(this.data);


      }
    constructor(
        private activeModal: NgbActiveModal,
    ) {}
    onCancel() {
        this.activeModal.dismiss();
    }
}
