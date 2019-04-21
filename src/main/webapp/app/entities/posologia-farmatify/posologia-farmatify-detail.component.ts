import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

@Component({
    selector: 'jhi-posologia-farmatify-detail',
    templateUrl: './posologia-farmatify-detail.component.html'
})
export class PosologiaFarmatifyDetailComponent implements OnInit {
    posologia: IPosologiaFarmatify;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ posologia }) => {
            this.posologia = posologia;
        });
    }

    previousState() {
        window.history.back();
    }
}
