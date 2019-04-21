import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';
import { PosologiaFarmatifyService } from './posologia-farmatify.service';
import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';
import { MedicamentoFarmatifyService } from 'app/entities/medicamento-farmatify';

@Component({
    selector: 'jhi-posologia-farmatify-update',
    templateUrl: './posologia-farmatify-update.component.html'
})
export class PosologiaFarmatifyUpdateComponent implements OnInit {
    posologia: IPosologiaFarmatify;
    isSaving: boolean;

    medicamentos: IMedicamentoFarmatify[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected posologiaService: PosologiaFarmatifyService,
        protected medicamentoService: MedicamentoFarmatifyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ posologia }) => {
            this.posologia = posologia;
        });
        this.medicamentoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMedicamentoFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMedicamentoFarmatify[]>) => response.body)
            )
            .subscribe((res: IMedicamentoFarmatify[]) => (this.medicamentos = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.posologia.id !== undefined) {
            this.subscribeToSaveResponse(this.posologiaService.update(this.posologia));
        } else {
            this.subscribeToSaveResponse(this.posologiaService.create(this.posologia));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPosologiaFarmatify>>) {
        result.subscribe((res: HttpResponse<IPosologiaFarmatify>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMedicamentoById(index: number, item: IMedicamentoFarmatify) {
        return item.id;
    }
}
