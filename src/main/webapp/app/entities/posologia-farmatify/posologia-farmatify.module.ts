import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FarmatifySharedModule } from 'app/shared';
import {
    PosologiaFarmatifyComponent,
    PosologiaFarmatifyDetailComponent,
    PosologiaFarmatifyUpdateComponent,
    PosologiaFarmatifyDeletePopupComponent,
    PosologiaFarmatifyDeleteDialogComponent,
    posologiaRoute,
    posologiaPopupRoute
} from './';

const ENTITY_STATES = [...posologiaRoute, ...posologiaPopupRoute];

@NgModule({
    imports: [FarmatifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PosologiaFarmatifyComponent,
        PosologiaFarmatifyDetailComponent,
        PosologiaFarmatifyUpdateComponent,
        PosologiaFarmatifyDeleteDialogComponent,
        PosologiaFarmatifyDeletePopupComponent
    ],
    entryComponents: [
        PosologiaFarmatifyComponent,
        PosologiaFarmatifyUpdateComponent,
        PosologiaFarmatifyDeleteDialogComponent,
        PosologiaFarmatifyDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifyPosologiaFarmatifyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
