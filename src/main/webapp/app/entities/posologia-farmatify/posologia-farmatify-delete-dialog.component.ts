import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';
import { PosologiaFarmatifyService } from './posologia-farmatify.service';

@Component({
    selector: 'jhi-posologia-farmatify-delete-dialog',
    templateUrl: './posologia-farmatify-delete-dialog.component.html'
})
export class PosologiaFarmatifyDeleteDialogComponent {
    posologia: IPosologiaFarmatify;

    constructor(
        protected posologiaService: PosologiaFarmatifyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.posologiaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'posologiaListModification',
                content: 'Deleted an posologia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-posologia-farmatify-delete-popup',
    template: ''
})
export class PosologiaFarmatifyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ posologia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PosologiaFarmatifyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.posologia = posologia;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/posologia-farmatify', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/posologia-farmatify', { outlets: { popup: null } }]);
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
