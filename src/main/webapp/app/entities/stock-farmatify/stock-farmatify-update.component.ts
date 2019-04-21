import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';
import { StockFarmatifyService } from './stock-farmatify.service';
import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';
import { FarmaciaFarmatifyService } from 'app/entities/farmacia-farmatify';

@Component({
    selector: 'jhi-stock-farmatify-update',
    templateUrl: './stock-farmatify-update.component.html'
})
export class StockFarmatifyUpdateComponent implements OnInit {
    stock: IStockFarmatify;
    isSaving: boolean;

    farmacias: IFarmaciaFarmatify[];
    fechaRepuesta: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected stockService: StockFarmatifyService,
        protected farmaciaService: FarmaciaFarmatifyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stock }) => {
            this.stock = stock;
            this.fechaRepuesta = this.stock.fechaRepuesta != null ? this.stock.fechaRepuesta.format(DATE_TIME_FORMAT) : null;
        });
        this.farmaciaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFarmaciaFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFarmaciaFarmatify[]>) => response.body)
            )
            .subscribe((res: IFarmaciaFarmatify[]) => (this.farmacias = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.stock.fechaRepuesta = this.fechaRepuesta != null ? moment(this.fechaRepuesta, DATE_TIME_FORMAT) : null;
        if (this.stock.id !== undefined) {
            this.subscribeToSaveResponse(this.stockService.update(this.stock));
        } else {
            this.subscribeToSaveResponse(this.stockService.create(this.stock));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockFarmatify>>) {
        result.subscribe((res: HttpResponse<IStockFarmatify>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFarmaciaById(index: number, item: IFarmaciaFarmatify) {
        return item.id;
    }
}
