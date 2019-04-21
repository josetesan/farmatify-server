import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';

@Component({
    selector: 'jhi-usuario-farmatify-detail',
    templateUrl: './usuario-farmatify-detail.component.html'
})
export class UsuarioFarmatifyDetailComponent implements OnInit {
    usuario: IUsuarioFarmatify;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
    }

    previousState() {
        window.history.back();
    }
}
