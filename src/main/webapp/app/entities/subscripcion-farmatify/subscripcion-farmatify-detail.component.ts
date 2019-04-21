import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

@Component({
    selector: 'jhi-subscripcion-farmatify-detail',
    templateUrl: './subscripcion-farmatify-detail.component.html'
})
export class SubscripcionFarmatifyDetailComponent implements OnInit {
    subscripcion: ISubscripcionFarmatify;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subscripcion }) => {
            this.subscripcion = subscripcion;
        });
    }

    previousState() {
        window.history.back();
    }
}
