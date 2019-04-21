import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';
import { AccountService } from 'app/core';
import { FarmaciaFarmatifyService } from './farmacia-farmatify.service';

@Component({
    selector: 'jhi-farmacia-farmatify',
    templateUrl: './farmacia-farmatify.component.html'
})
export class FarmaciaFarmatifyComponent implements OnInit, OnDestroy {
    farmacias: IFarmaciaFarmatify[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected farmaciaService: FarmaciaFarmatifyService,
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
            this.farmaciaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IFarmaciaFarmatify[]>) => res.ok),
                    map((res: HttpResponse<IFarmaciaFarmatify[]>) => res.body)
                )
                .subscribe((res: IFarmaciaFarmatify[]) => (this.farmacias = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.farmaciaService
            .query()
            .pipe(
                filter((res: HttpResponse<IFarmaciaFarmatify[]>) => res.ok),
                map((res: HttpResponse<IFarmaciaFarmatify[]>) => res.body)
            )
            .subscribe(
                (res: IFarmaciaFarmatify[]) => {
                    this.farmacias = res;
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
        this.registerChangeInFarmacias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFarmaciaFarmatify) {
        return item.id;
    }

    registerChangeInFarmacias() {
        this.eventSubscriber = this.eventManager.subscribe('farmaciaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
