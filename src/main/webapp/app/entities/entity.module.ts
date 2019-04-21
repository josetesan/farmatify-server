import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'medicamento-farmatify',
                loadChildren: './medicamento-farmatify/medicamento-farmatify.module#FarmatifyMedicamentoFarmatifyModule'
            },
            {
                path: 'posologia-farmatify',
                loadChildren: './posologia-farmatify/posologia-farmatify.module#FarmatifyPosologiaFarmatifyModule'
            },
            {
                path: 'farmacia-farmatify',
                loadChildren: './farmacia-farmatify/farmacia-farmatify.module#FarmatifyFarmaciaFarmatifyModule'
            },
            {
                path: 'cliente-farmatify',
                loadChildren: './cliente-farmatify/cliente-farmatify.module#FarmatifyClienteFarmatifyModule'
            },
            {
                path: 'subscripcion-farmatify',
                loadChildren: './subscripcion-farmatify/subscripcion-farmatify.module#FarmatifySubscripcionFarmatifyModule'
            },
            {
                path: 'medicamento-farmatify',
                loadChildren: './medicamento-farmatify/medicamento-farmatify.module#FarmatifyMedicamentoFarmatifyModule'
            },
            {
                path: 'posologia-farmatify',
                loadChildren: './posologia-farmatify/posologia-farmatify.module#FarmatifyPosologiaFarmatifyModule'
            },
            {
                path: 'farmacia-farmatify',
                loadChildren: './farmacia-farmatify/farmacia-farmatify.module#FarmatifyFarmaciaFarmatifyModule'
            },
            {
                path: 'usuario-farmatify',
                loadChildren: './usuario-farmatify/usuario-farmatify.module#FarmatifyUsuarioFarmatifyModule'
            },
            {
                path: 'subscripcion-farmatify',
                loadChildren: './subscripcion-farmatify/subscripcion-farmatify.module#FarmatifySubscripcionFarmatifyModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifyEntityModule {}
