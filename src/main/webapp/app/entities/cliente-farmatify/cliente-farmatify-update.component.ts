import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';
import { ClienteFarmatifyService } from './cliente-farmatify.service';

@Component({
    selector: 'jhi-cliente-farmatify-update',
    templateUrl: './cliente-farmatify-update.component.html'
})
export class ClienteFarmatifyUpdateComponent implements OnInit {
    cliente: IClienteFarmatify;
    isSaving: boolean;

    constructor(protected clienteService: ClienteFarmatifyService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cliente }) => {
            this.cliente = cliente;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cliente.id !== undefined) {
            this.subscribeToSaveResponse(this.clienteService.update(this.cliente));
        } else {
            this.subscribeToSaveResponse(this.clienteService.create(this.cliente));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IClienteFarmatify>>) {
        result.subscribe((res: HttpResponse<IClienteFarmatify>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
