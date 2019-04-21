import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';
import { UsuarioFarmatifyService } from './usuario-farmatify.service';
import { UsuarioFarmatifyComponent } from './usuario-farmatify.component';
import { UsuarioFarmatifyDetailComponent } from './usuario-farmatify-detail.component';
import { UsuarioFarmatifyUpdateComponent } from './usuario-farmatify-update.component';
import { UsuarioFarmatifyDeletePopupComponent } from './usuario-farmatify-delete-dialog.component';
import { IUsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';

@Injectable({ providedIn: 'root' })
export class UsuarioFarmatifyResolve implements Resolve<IUsuarioFarmatify> {
    constructor(private service: UsuarioFarmatifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUsuarioFarmatify> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UsuarioFarmatify>) => response.ok),
                map((usuario: HttpResponse<UsuarioFarmatify>) => usuario.body)
            );
        }
        return of(new UsuarioFarmatify());
    }
}

export const usuarioRoute: Routes = [
    {
        path: '',
        component: UsuarioFarmatifyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UsuarioFarmatifyDetailComponent,
        resolve: {
            usuario: UsuarioFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UsuarioFarmatifyUpdateComponent,
        resolve: {
            usuario: UsuarioFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UsuarioFarmatifyUpdateComponent,
        resolve: {
            usuario: UsuarioFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UsuarioFarmatifyDeletePopupComponent,
        resolve: {
            usuario: UsuarioFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
