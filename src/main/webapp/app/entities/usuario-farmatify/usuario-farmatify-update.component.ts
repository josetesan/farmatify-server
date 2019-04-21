import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';
import { UsuarioFarmatifyService } from './usuario-farmatify.service';

@Component({
    selector: 'jhi-usuario-farmatify-update',
    templateUrl: './usuario-farmatify-update.component.html'
})
export class UsuarioFarmatifyUpdateComponent implements OnInit {
    usuario: IUsuarioFarmatify;
    isSaving: boolean;

    constructor(protected usuarioService: UsuarioFarmatifyService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioFarmatify>>) {
        result.subscribe((res: HttpResponse<IUsuarioFarmatify>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
