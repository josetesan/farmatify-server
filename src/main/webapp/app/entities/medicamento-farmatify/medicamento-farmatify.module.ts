import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FarmatifySharedModule } from 'app/shared';
import {
    MedicamentoFarmatifyComponent,
    MedicamentoFarmatifyDetailComponent,
    MedicamentoFarmatifyUpdateComponent,
    MedicamentoFarmatifyDeletePopupComponent,
    MedicamentoFarmatifyDeleteDialogComponent,
    medicamentoRoute,
    medicamentoPopupRoute
} from './';

const ENTITY_STATES = [...medicamentoRoute, ...medicamentoPopupRoute];

@NgModule({
    imports: [FarmatifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedicamentoFarmatifyComponent,
        MedicamentoFarmatifyDetailComponent,
        MedicamentoFarmatifyUpdateComponent,
        MedicamentoFarmatifyDeleteDialogComponent,
        MedicamentoFarmatifyDeletePopupComponent
    ],
    entryComponents: [
        MedicamentoFarmatifyComponent,
        MedicamentoFarmatifyUpdateComponent,
        MedicamentoFarmatifyDeleteDialogComponent,
        MedicamentoFarmatifyDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifyMedicamentoFarmatifyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
