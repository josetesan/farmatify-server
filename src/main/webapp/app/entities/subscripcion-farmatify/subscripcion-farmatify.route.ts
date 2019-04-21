import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';
import { SubscripcionFarmatifyService } from './subscripcion-farmatify.service';
import { SubscripcionFarmatifyComponent } from './subscripcion-farmatify.component';
import { SubscripcionFarmatifyDetailComponent } from './subscripcion-farmatify-detail.component';
import { SubscripcionFarmatifyUpdateComponent } from './subscripcion-farmatify-update.component';
import { SubscripcionFarmatifyDeletePopupComponent } from './subscripcion-farmatify-delete-dialog.component';
import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

@Injectable({ providedIn: 'root' })
export class SubscripcionFarmatifyResolve implements Resolve<ISubscripcionFarmatify> {
    constructor(private service: SubscripcionFarmatifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubscripcionFarmatify> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SubscripcionFarmatify>) => response.ok),
                map((subscripcion: HttpResponse<SubscripcionFarmatify>) => subscripcion.body)
            );
        }
        return of(new SubscripcionFarmatify());
    }
}

export const subscripcionRoute: Routes = [
    {
        path: '',
        component: SubscripcionFarmatifyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SubscripcionFarmatifyDetailComponent,
        resolve: {
            subscripcion: SubscripcionFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SubscripcionFarmatifyUpdateComponent,
        resolve: {
            subscripcion: SubscripcionFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SubscripcionFarmatifyUpdateComponent,
        resolve: {
            subscripcion: SubscripcionFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscripcionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SubscripcionFarmatifyDeletePopupComponent,
        resolve: {
            subscripcion: SubscripcionFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
