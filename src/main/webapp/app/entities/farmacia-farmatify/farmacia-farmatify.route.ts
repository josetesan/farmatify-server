import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';
import { FarmaciaFarmatifyService } from './farmacia-farmatify.service';
import { FarmaciaFarmatifyComponent } from './farmacia-farmatify.component';
import { FarmaciaFarmatifyDetailComponent } from './farmacia-farmatify-detail.component';
import { FarmaciaFarmatifyUpdateComponent } from './farmacia-farmatify-update.component';
import { FarmaciaFarmatifyDeletePopupComponent } from './farmacia-farmatify-delete-dialog.component';
import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';

@Injectable({ providedIn: 'root' })
export class FarmaciaFarmatifyResolve implements Resolve<IFarmaciaFarmatify> {
    constructor(private service: FarmaciaFarmatifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFarmaciaFarmatify> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FarmaciaFarmatify>) => response.ok),
                map((farmacia: HttpResponse<FarmaciaFarmatify>) => farmacia.body)
            );
        }
        return of(new FarmaciaFarmatify());
    }
}

export const farmaciaRoute: Routes = [
    {
        path: '',
        component: FarmaciaFarmatifyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.farmacia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FarmaciaFarmatifyDetailComponent,
        resolve: {
            farmacia: FarmaciaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.farmacia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FarmaciaFarmatifyUpdateComponent,
        resolve: {
            farmacia: FarmaciaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.farmacia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FarmaciaFarmatifyUpdateComponent,
        resolve: {
            farmacia: FarmaciaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.farmacia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const farmaciaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FarmaciaFarmatifyDeletePopupComponent,
        resolve: {
            farmacia: FarmaciaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.farmacia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
