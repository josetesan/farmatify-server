import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';
import { AccountService } from 'app/core';
import { MedicamentoFarmatifyService } from './medicamento-farmatify.service';

@Component({
    selector: 'jhi-medicamento-farmatify',
    templateUrl: './medicamento-farmatify.component.html'
})
export class MedicamentoFarmatifyComponent implements OnInit, OnDestroy {
    medicamentos: IMedicamentoFarmatify[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected medicamentoService: MedicamentoFarmatifyService,
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
            this.medicamentoService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IMedicamentoFarmatify[]>) => res.ok),
                    map((res: HttpResponse<IMedicamentoFarmatify[]>) => res.body)
                )
                .subscribe(
                    (res: IMedicamentoFarmatify[]) => (this.medicamentos = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.medicamentoService
            .query()
            .pipe(
                filter((res: HttpResponse<IMedicamentoFarmatify[]>) => res.ok),
                map((res: HttpResponse<IMedicamentoFarmatify[]>) => res.body)
            )
            .subscribe(
                (res: IMedicamentoFarmatify[]) => {
                    this.medicamentos = res;
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
        this.registerChangeInMedicamentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedicamentoFarmatify) {
        return item.id;
    }

    registerChangeInMedicamentos() {
        this.eventSubscriber = this.eventManager.subscribe('medicamentoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
