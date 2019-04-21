import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';
import { PosologiaFarmatifyService } from './posologia-farmatify.service';
import { PosologiaFarmatifyComponent } from './posologia-farmatify.component';
import { PosologiaFarmatifyDetailComponent } from './posologia-farmatify-detail.component';
import { PosologiaFarmatifyUpdateComponent } from './posologia-farmatify-update.component';
import { PosologiaFarmatifyDeletePopupComponent } from './posologia-farmatify-delete-dialog.component';
import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

@Injectable({ providedIn: 'root' })
export class PosologiaFarmatifyResolve implements Resolve<IPosologiaFarmatify> {
    constructor(private service: PosologiaFarmatifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPosologiaFarmatify> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PosologiaFarmatify>) => response.ok),
                map((posologia: HttpResponse<PosologiaFarmatify>) => posologia.body)
            );
        }
        return of(new PosologiaFarmatify());
    }
}

export const posologiaRoute: Routes = [
    {
        path: '',
        component: PosologiaFarmatifyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.posologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PosologiaFarmatifyDetailComponent,
        resolve: {
            posologia: PosologiaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.posologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PosologiaFarmatifyUpdateComponent,
        resolve: {
            posologia: PosologiaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.posologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PosologiaFarmatifyUpdateComponent,
        resolve: {
            posologia: PosologiaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.posologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const posologiaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PosologiaFarmatifyDeletePopupComponent,
        resolve: {
            posologia: PosologiaFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.posologia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
