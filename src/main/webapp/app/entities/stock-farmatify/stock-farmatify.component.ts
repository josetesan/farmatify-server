import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';
import { AccountService } from 'app/core';
import { StockFarmatifyService } from './stock-farmatify.service';

@Component({
    selector: 'jhi-stock-farmatify',
    templateUrl: './stock-farmatify.component.html'
})
export class StockFarmatifyComponent implements OnInit, OnDestroy {
    stocks: IStockFarmatify[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected stockService: StockFarmatifyService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.stockService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IStockFarmatify[]>) => res.ok),
                    map((res: HttpResponse<IStockFarmatify[]>) => res.body)
                )
                .subscribe((res: IStockFarmatify[]) => (this.stocks = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.stockService
            .query()
            .pipe(
                filter((res: HttpResponse<IStockFarmatify[]>) => res.ok),
                map((res: HttpResponse<IStockFarmatify[]>) => res.body)
            )
            .subscribe(
                (res: IStockFarmatify[]) => {
                    this.stocks = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStockFarmatify) {
        return item.id;
    }

    registerChangeInStocks() {
        this.eventSubscriber = this.eventManager.subscribe('stockListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
