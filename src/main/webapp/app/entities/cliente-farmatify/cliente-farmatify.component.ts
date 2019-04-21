import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';
import { AccountService } from 'app/core';
import { ClienteFarmatifyService } from './cliente-farmatify.service';

@Component({
    selector: 'jhi-cliente-farmatify',
    templateUrl: './cliente-farmatify.component.html'
})
export class ClienteFarmatifyComponent implements OnInit, OnDestroy {
    clientes: IClienteFarmatify[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected clienteService: ClienteFarmatifyService,
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
            this.clienteService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IClienteFarmatify[]>) => res.ok),
                    map((res: HttpResponse<IClienteFarmatify[]>) => res.body)
                )
                .subscribe((res: IClienteFarmatify[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.clienteService
            .query()
            .pipe(
                filter((res: HttpResponse<IClienteFarmatify[]>) => res.ok),
                map((res: HttpResponse<IClienteFarmatify[]>) => res.body)
            )
            .subscribe(
                (res: IClienteFarmatify[]) => {
                    this.clientes = res;
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
        this.registerChangeInClientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClienteFarmatify) {
        return item.id;
    }

    registerChangeInClientes() {
        this.eventSubscriber = this.eventManager.subscribe('clienteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
