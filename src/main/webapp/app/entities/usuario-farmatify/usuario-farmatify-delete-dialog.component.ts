import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';
import { UsuarioFarmatifyService } from './usuario-farmatify.service';

@Component({
    selector: 'jhi-usuario-farmatify-delete-dialog',
    templateUrl: './usuario-farmatify-delete-dialog.component.html'
})
export class UsuarioFarmatifyDeleteDialogComponent {
    usuario: IUsuarioFarmatify;

    constructor(
        protected usuarioService: UsuarioFarmatifyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'usuarioListModification',
                content: 'Deleted an usuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuario-farmatify-delete-popup',
    template: ''
})
export class UsuarioFarmatifyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsuarioFarmatifyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.usuario = usuario;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/usuario-farmatify', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/usuario-farmatify', { outlets: { popup: null } }]);
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
