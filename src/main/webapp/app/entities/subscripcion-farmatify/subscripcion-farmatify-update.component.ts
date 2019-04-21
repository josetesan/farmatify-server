import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';
import { SubscripcionFarmatifyService } from './subscripcion-farmatify.service';
import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';
import { FarmaciaFarmatifyService } from 'app/entities/farmacia-farmatify';
import { IClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';
import { ClienteFarmatifyService } from 'app/entities/cliente-farmatify';
import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';
import { MedicamentoFarmatifyService } from 'app/entities/medicamento-farmatify';

@Component({
    selector: 'jhi-subscripcion-farmatify-update',
    templateUrl: './subscripcion-farmatify-update.component.html'
})
export class SubscripcionFarmatifyUpdateComponent implements OnInit {
    subscripcion: ISubscripcionFarmatify;
    isSaving: boolean;

    farmacias: IFarmaciaFarmatify[];

    clientes: IClienteFarmatify[];

    idmedicamentos: IMedicamentoFarmatify[];

    idfarmacias: IFarmaciaFarmatify[];

    idclientes: IClienteFarmatify[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected subscripcionService: SubscripcionFarmatifyService,
        protected farmaciaService: FarmaciaFarmatifyService,
        protected clienteService: ClienteFarmatifyService,
        protected medicamentoService: MedicamentoFarmatifyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subscripcion }) => {
            this.subscripcion = subscripcion;
        });
        this.farmaciaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFarmaciaFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFarmaciaFarmatify[]>) => response.body)
            )
            .subscribe((res: IFarmaciaFarmatify[]) => (this.farmacias = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.clienteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClienteFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClienteFarmatify[]>) => response.body)
            )
            .subscribe((res: IClienteFarmatify[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.medicamentoService
            .query({ filter: 'subscripcion-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMedicamentoFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMedicamentoFarmatify[]>) => response.body)
            )
            .subscribe(
                (res: IMedicamentoFarmatify[]) => {
                    if (!this.subscripcion.idMedicamentoId) {
                        this.idmedicamentos = res;
                    } else {
                        this.medicamentoService
                            .find(this.subscripcion.idMedicamentoId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMedicamentoFarmatify>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMedicamentoFarmatify>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMedicamentoFarmatify) => (this.idmedicamentos = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.farmaciaService
            .query({ filter: 'subscripcion-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IFarmaciaFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFarmaciaFarmatify[]>) => response.body)
            )
            .subscribe(
                (res: IFarmaciaFarmatify[]) => {
                    if (!this.subscripcion.idFarmaciaId) {
                        this.idfarmacias = res;
                    } else {
                        this.farmaciaService
                            .find(this.subscripcion.idFarmaciaId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IFarmaciaFarmatify>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IFarmaciaFarmatify>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IFarmaciaFarmatify) => (this.idfarmacias = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.clienteService
            .query({ filter: 'subscripcion-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IClienteFarmatify[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClienteFarmatify[]>) => response.body)
            )
            .subscribe(
                (res: IClienteFarmatify[]) => {
                    if (!this.subscripcion.idClienteId) {
                        this.idclientes = res;
                    } else {
                        this.clienteService
                            .find(this.subscripcion.idClienteId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IClienteFarmatify>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IClienteFarmatify>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IClienteFarmatify) => (this.idclientes = [subRes].concat(res)),
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

    trackClienteById(index: number, item: IClienteFarmatify) {
        return item.id;
    }

    trackMedicamentoById(index: number, item: IMedicamentoFarmatify) {
        return item.id;
    }
}
