import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';
import { AccountService } from 'app/core';
import { PosologiaFarmatifyService } from './posologia-farmatify.service';

@Component({
    selector: 'jhi-posologia-farmatify',
    templateUrl: './posologia-farmatify.component.html'
})
export class PosologiaFarmatifyComponent implements OnInit, OnDestroy {
    posologias: IPosologiaFarmatify[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected posologiaService: PosologiaFarmatifyService,
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
            this.posologiaService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IPosologiaFarmatify[]>) => res.ok),
                    map((res: HttpResponse<IPosologiaFarmatify[]>) => res.body)
                )
                .subscribe((res: IPosologiaFarmatify[]) => (this.posologias = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.posologiaService
            .query()
            .pipe(
                filter((res: HttpResponse<IPosologiaFarmatify[]>) => res.ok),
                map((res: HttpResponse<IPosologiaFarmatify[]>) => res.body)
            )
            .subscribe(
                (res: IPosologiaFarmatify[]) => {
                    this.posologias = res;
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
        this.registerChangeInPosologias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPosologiaFarmatify) {
        return item.id;
    }

    registerChangeInPosologias() {
        this.eventSubscriber = this.eventManager.subscribe('posologiaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
