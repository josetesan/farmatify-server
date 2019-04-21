import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';
import { FarmaciaFarmatifyService } from './farmacia-farmatify.service';

@Component({
    selector: 'jhi-farmacia-farmatify-update',
    templateUrl: './farmacia-farmatify-update.component.html'
})
export class FarmaciaFarmatifyUpdateComponent implements OnInit {
    farmacia: IFarmaciaFarmatify;
    isSaving: boolean;

    constructor(protected farmaciaService: FarmaciaFarmatifyService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ farmacia }) => {
            this.farmacia = farmacia;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.farmacia.id !== undefined) {
            this.subscribeToSaveResponse(this.farmaciaService.update(this.farmacia));
        } else {
            this.subscribeToSaveResponse(this.farmaciaService.create(this.farmacia));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFarmaciaFarmatify>>) {
        result.subscribe((res: HttpResponse<IFarmaciaFarmatify>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
