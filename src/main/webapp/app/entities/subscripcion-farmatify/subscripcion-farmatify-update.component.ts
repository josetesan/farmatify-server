import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';
import { SubscripcionFarmatifyService } from './subscripcion-farmatify.service';
import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';
import { FarmaciaFarmatifyService } from 'app/entities/farmacia-farmatify';
import { IUsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';
import { UsuarioFarmatifyService } from 'app/entities/usuario-farmatify';

@Component({
    selector: 'jhi-subscripcion-farmatify-update',
    templateUrl: './subscripcion-farmatify-update.component.html'
})
export class SubscripcionFarmatifyUpdateComponent implements OnInit {
    subscripcion: ISubscripcionFarmatify;
    isSaving: boolean;

    farmacias: IFarmaciaFarmatify[];

    usuarios: IUsuarioFarmatify[];
    fechaInicio: string;
    fechaFin: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected subscripcionService: SubscripcionFarmatifyService,
        protected farmaciaService: FarmaciaFarmatifyService,
        protected usuarioService: UsuarioFarmatifyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subscripcion }) => {
            this.subscripcion = subscripcion;
            this.fechaInicio = this.subscripcion.fechaInicio != null ? this.subscripcion.fechaInicio.format(DATE_TIME_FORMAT) : null;
            this.fechaFin = this.subscripcion.fechaFin != null ? this.subscripcion.fechaFin.format(DATE_TIME_FORMAT) : null;
        });
        this.farmaciaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFarmaciaFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFarmaciaFarmatify[]>) => response.body)
            )
            .subscribe((res: IFarmaciaFarmatify[]) => (this.farmacias = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.usuarioService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUsuarioFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUsuarioFarmatify[]>) => response.body)
            )
            .subscribe((res: IUsuarioFarmatify[]) => (this.usuarios = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.subscripcion.fechaInicio = this.fechaInicio != null ? moment(this.fechaInicio, DATE_TIME_FORMAT) : null;
        this.subscripcion.fechaFin = this.fechaFin != null ? moment(this.fechaFin, DATE_TIME_FORMAT) : null;
        if (this.subscripcion.id !== undefined) {
            this.subscribeToSaveResponse(this.subscripcionService.update(this.subscripcion));
        } else {
            this.subscribeToSaveResponse(this.subscripcionService.create(this.subscripcion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscripcionFarmatify>>) {
        result.subscribe(
            (res: HttpResponse<ISubscripcionFarmatify>) => this.onSaveSuccess(),
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

    trackFarmaciaById(index: number, item: IFarmaciaFarmatify) {
        return item.id;
    }

    trackUsuarioById(index: number, item: IUsuarioFarmatify) {
        return item.id;
    }
}
