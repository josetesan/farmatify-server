import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';

@Component({
    selector: 'jhi-cliente-farmatify-detail',
    templateUrl: './cliente-farmatify-detail.component.html'
})
export class ClienteFarmatifyDetailComponent implements OnInit {
    cliente: IClienteFarmatify;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cliente }) => {
            this.cliente = cliente;
        });
    }

    previousState() {
        window.history.back();
    }
}
