import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';

@Component({
    selector: 'jhi-stock-farmatify-detail',
    templateUrl: './stock-farmatify-detail.component.html'
})
export class StockFarmatifyDetailComponent implements OnInit {
    stock: IStockFarmatify;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stock }) => {
            this.stock = stock;
        });
    }

    previousState() {
        window.history.back();
    }
}
