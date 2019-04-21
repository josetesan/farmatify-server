import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';
import { MedicamentoFarmatifyService } from './medicamento-farmatify.service';

@Component({
    selector: 'jhi-medicamento-farmatify-delete-dialog',
    templateUrl: './medicamento-farmatify-delete-dialog.component.html'
})
export class MedicamentoFarmatifyDeleteDialogComponent {
    medicamento: IMedicamentoFarmatify;

    constructor(
        protected medicamentoService: MedicamentoFarmatifyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medicamentoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medicamentoListModification',
                content: 'Deleted an medicamento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medicamento-farmatify-delete-popup',
    template: ''
})
export class MedicamentoFarmatifyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medicamento }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedicamentoFarmatifyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medicamento = medicamento;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/medicamento-farmatify', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/medicamento-farmatify', { outlets: { popup: null } }]);
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
