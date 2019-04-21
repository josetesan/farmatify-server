import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';
import { StockFarmatifyService } from './stock-farmatify.service';

@Component({
    selector: 'jhi-stock-farmatify-delete-dialog',
    templateUrl: './stock-farmatify-delete-dialog.component.html'
})
export class StockFarmatifyDeleteDialogComponent {
    stock: IStockFarmatify;

    constructor(
        protected stockService: StockFarmatifyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stockListModification',
                content: 'Deleted an stock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-farmatify-delete-popup',
    template: ''
})
export class StockFarmatifyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stock }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StockFarmatifyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stock = stock;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/stock-farmatify', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/stock-farmatify', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
