import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';
import { AccountService } from 'app/core';
import { SubscripcionFarmatifyService } from './subscripcion-farmatify.service';

@Component({
    selector: 'jhi-subscripcion-farmatify',
    templateUrl: './subscripcion-farmatify.component.html'
})
export class SubscripcionFarmatifyComponent implements OnInit, OnDestroy {
    subscripcions: ISubscripcionFarmatify[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected subscripcionService: SubscripcionFarmatifyService,
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
            this.subscripcionService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<ISubscripcionFarmatify[]>) => res.ok),
                    map((res: HttpResponse<ISubscripcionFarmatify[]>) => res.body)
                )
                .subscribe(
                    (res: ISubscripcionFarmatify[]) => (this.subscripcions = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.subscripcionService
            .query()
            .pipe(
                filter((res: HttpResponse<ISubscripcionFarmatify[]>) => res.ok),
                map((res: HttpResponse<ISubscripcionFarmatify[]>) => res.body)
            )
            .subscribe(
                (res: ISubscripcionFarmatify[]) => {
                    this.subscripcions = res;
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
        this.registerChangeInSubscripcions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubscripcionFarmatify) {
        return item.id;
    }

    registerChangeInSubscripcions() {
        this.eventSubscriber = this.eventManager.subscribe('subscripcionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
