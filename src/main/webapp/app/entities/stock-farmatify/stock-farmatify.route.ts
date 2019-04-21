import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StockFarmatify } from 'app/shared/model/stock-farmatify.model';
import { StockFarmatifyService } from './stock-farmatify.service';
import { StockFarmatifyComponent } from './stock-farmatify.component';
import { StockFarmatifyDetailComponent } from './stock-farmatify-detail.component';
import { StockFarmatifyUpdateComponent } from './stock-farmatify-update.component';
import { StockFarmatifyDeletePopupComponent } from './stock-farmatify-delete-dialog.component';
import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';

@Injectable({ providedIn: 'root' })
export class StockFarmatifyResolve implements Resolve<IStockFarmatify> {
    constructor(private service: StockFarmatifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStockFarmatify> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StockFarmatify>) => response.ok),
                map((stock: HttpResponse<StockFarmatify>) => stock.body)
            );
        }
        return of(new StockFarmatify());
    }
}

export const stockRoute: Routes = [
    {
        path: '',
        component: StockFarmatifyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.stock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StockFarmatifyDetailComponent,
        resolve: {
            stock: StockFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.stock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StockFarmatifyUpdateComponent,
        resolve: {
            stock: StockFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.stock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StockFarmatifyUpdateComponent,
        resolve: {
            stock: StockFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.stock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StockFarmatifyDeletePopupComponent,
        resolve: {
            stock: StockFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.stock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
