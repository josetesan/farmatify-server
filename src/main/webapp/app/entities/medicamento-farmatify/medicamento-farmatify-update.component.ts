import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';
import { MedicamentoFarmatifyService } from './medicamento-farmatify.service';
import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';
import { SubscripcionFarmatifyService } from 'app/entities/subscripcion-farmatify';

@Component({
    selector: 'jhi-medicamento-farmatify-update',
    templateUrl: './medicamento-farmatify-update.component.html'
})
export class MedicamentoFarmatifyUpdateComponent implements OnInit {
    medicamento: IMedicamentoFarmatify;
    isSaving: boolean;

    subscripcions: ISubscripcionFarmatify[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected medicamentoService: MedicamentoFarmatifyService,
        protected subscripcionService: SubscripcionFarmatifyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medicamento }) => {
            this.medicamento = medicamento;
        });
        this.subscripcionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISubscripcionFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISubscripcionFarmatify[]>) => response.body)
            )
            .subscribe(
                (res: ISubscripcionFarmatify[]) => (this.subscripcions = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medicamento.id !== undefined) {
            this.subscribeToSaveResponse(this.medicamentoService.update(this.medicamento));
        } else {
            this.subscribeToSaveResponse(this.medicamentoService.create(this.medicamento));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicamentoFarmatify>>) {
        result.subscribe(
            (res: HttpResponse<IMedicamentoFarmatify>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSubscripcionById(index: number, item: ISubscripcionFarmatify) {
        return item.id;
    }
}
