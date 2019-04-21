import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';
import { FarmaciaFarmatifyService } from './farmacia-farmatify.service';

@Component({
    selector: 'jhi-farmacia-farmatify-delete-dialog',
    templateUrl: './farmacia-farmatify-delete-dialog.component.html'
})
export class FarmaciaFarmatifyDeleteDialogComponent {
    farmacia: IFarmaciaFarmatify;

    constructor(
        protected farmaciaService: FarmaciaFarmatifyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.farmaciaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'farmaciaListModification',
                content: 'Deleted an farmacia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-farmacia-farmatify-delete-popup',
    template: ''
})
export class FarmaciaFarmatifyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ farmacia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FarmaciaFarmatifyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.farmacia = farmacia;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/farmacia-farmatify', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/farmacia-farmatify', { outlets: { popup: null } }]);
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
