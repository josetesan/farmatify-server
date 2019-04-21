import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';

@Component({
    selector: 'jhi-farmacia-farmatify-detail',
    templateUrl: './farmacia-farmatify-detail.component.html'
})
export class FarmaciaFarmatifyDetailComponent implements OnInit {
    farmacia: IFarmaciaFarmatify;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ farmacia }) => {
            this.farmacia = farmacia;
        });
    }

    previousState() {
        window.history.back();
    }
}
