import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FarmatifySharedModule } from 'app/shared';
import {
    FarmaciaFarmatifyComponent,
    FarmaciaFarmatifyDetailComponent,
    FarmaciaFarmatifyUpdateComponent,
    FarmaciaFarmatifyDeletePopupComponent,
    FarmaciaFarmatifyDeleteDialogComponent,
    farmaciaRoute,
    farmaciaPopupRoute
} from './';

const ENTITY_STATES = [...farmaciaRoute, ...farmaciaPopupRoute];

@NgModule({
    imports: [FarmatifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FarmaciaFarmatifyComponent,
        FarmaciaFarmatifyDetailComponent,
        FarmaciaFarmatifyUpdateComponent,
        FarmaciaFarmatifyDeleteDialogComponent,
        FarmaciaFarmatifyDeletePopupComponent
    ],
    entryComponents: [
        FarmaciaFarmatifyComponent,
        FarmaciaFarmatifyUpdateComponent,
        FarmaciaFarmatifyDeleteDialogComponent,
        FarmaciaFarmatifyDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifyFarmaciaFarmatifyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
