import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

@Component({
    selector: 'jhi-medicamento-farmatify-detail',
    templateUrl: './medicamento-farmatify-detail.component.html'
})
export class MedicamentoFarmatifyDetailComponent implements OnInit {
    medicamento: IMedicamentoFarmatify;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medicamento }) => {
            this.medicamento = medicamento;
        });
    }

    previousState() {
        window.history.back();
    }
}
