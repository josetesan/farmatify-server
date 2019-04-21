import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';
import { MedicamentoFarmatifyService } from './medicamento-farmatify.service';
import { MedicamentoFarmatifyComponent } from './medicamento-farmatify.component';
import { MedicamentoFarmatifyDetailComponent } from './medicamento-farmatify-detail.component';
import { MedicamentoFarmatifyUpdateComponent } from './medicamento-farmatify-update.component';
import { MedicamentoFarmatifyDeletePopupComponent } from './medicamento-farmatify-delete-dialog.component';
import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

@Injectable({ providedIn: 'root' })
export class MedicamentoFarmatifyResolve implements Resolve<IMedicamentoFarmatify> {
    constructor(private service: MedicamentoFarmatifyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMedicamentoFarmatify> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MedicamentoFarmatify>) => response.ok),
                map((medicamento: HttpResponse<MedicamentoFarmatify>) => medicamento.body)
            );
        }
        return of(new MedicamentoFarmatify());
    }
}

export const medicamentoRoute: Routes = [
    {
        path: '',
        component: MedicamentoFarmatifyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.medicamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MedicamentoFarmatifyDetailComponent,
        resolve: {
            medicamento: MedicamentoFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.medicamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MedicamentoFarmatifyUpdateComponent,
        resolve: {
            medicamento: MedicamentoFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.medicamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MedicamentoFarmatifyUpdateComponent,
        resolve: {
            medicamento: MedicamentoFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.medicamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medicamentoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MedicamentoFarmatifyDeletePopupComponent,
        resolve: {
            medicamento: MedicamentoFarmatifyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'farmatifyApp.medicamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
