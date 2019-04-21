import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';
import { ClienteFarmatifyService } from './cliente-farmatify.service';
import { ClienteFarmatifyComponent } from './cliente-farmatify.component';
import { ClienteFarmatifyDetailComponent } from './cliente-farmatify-detail.component';
import { ClienteFarmatifyUpdateComponent } from './cliente-farmatify-update.component';
import { ClienteFarmatifyDeletePopupComponent } from './cliente-farmatify-delete-dialog.component';
import { IClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';

@Injectable({ providedIn: 'root' })
export class ClienteFarmatifyResolve implements Resolve<IClienteFarmatify> {
    constructor(private service: ClienteFarmatifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClienteFarmatify> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ClienteFarmatify>) => response.ok),
                map((cliente: HttpResponse<ClienteFarmatify>) => cliente.body)
            );
        }
        return of(new ClienteFarmatify());
    }
}

export const clienteRoute: Routes = [
    {
        path: '',
        component: ClienteFarmatifyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ClienteFarmatifyDetailComponent,
        resolve: {
            cliente: ClienteFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ClienteFarmatifyUpdateComponent,
        resolve: {
            cliente: ClienteFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ClienteFarmatifyUpdateComponent,
        resolve: {
            cliente: ClienteFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ClienteFarmatifyDeletePopupComponent,
        resolve: {
            cliente: ClienteFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
