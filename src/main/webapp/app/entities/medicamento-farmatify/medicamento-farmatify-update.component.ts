import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';
import { MedicamentoFarmatifyService } from './medicamento-farmatify.service';
import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';
import { StockFarmatifyService } from 'app/entities/stock-farmatify';

@Component({
    selector: 'jhi-medicamento-farmatify-update',
    templateUrl: './medicamento-farmatify-update.component.html'
})
export class MedicamentoFarmatifyUpdateComponent implements OnInit {
    medicamento: IMedicamentoFarmatify;
    isSaving: boolean;

    stocks: IStockFarmatify[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected medicamentoService: MedicamentoFarmatifyService,
        protected stockService: StockFarmatifyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medicamento }) => {
            this.medicamento = medicamento;
        });
        this.stockService
            .query({ filter: 'medicamento-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IStockFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStockFarmatify[]>) => response.body)
            )
            .subscribe(
                (res: IStockFarmatify[]) => {
                    if (!this.medicamento.stockId) {
                        this.stocks = res;
                    } else {
                        this.stockService
                            .find(this.medicamento.stockId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IStockFarmatify>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IStockFarmatify>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IStockFarmatify) => (this.stocks = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
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

    trackStockById(index: number, item: IStockFarmatify) {
        return item.id;
    }
}
