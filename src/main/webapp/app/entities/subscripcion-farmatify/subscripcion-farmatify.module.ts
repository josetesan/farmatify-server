import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FarmatifySharedModule } from 'app/shared';
import {
    SubscripcionFarmatifyComponent,
    SubscripcionFarmatifyDetailComponent,
    SubscripcionFarmatifyUpdateComponent,
    SubscripcionFarmatifyDeletePopupComponent,
    SubscripcionFarmatifyDeleteDialogComponent,
    subscripcionRoute,
    subscripcionPopupRoute
} from './';

const ENTITY_STATES = [...subscripcionRoute, ...subscripcionPopupRoute];

@NgModule({
    imports: [FarmatifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubscripcionFarmatifyComponent,
        SubscripcionFarmatifyDetailComponent,
        SubscripcionFarmatifyUpdateComponent,
        SubscripcionFarmatifyDeleteDialogComponent,
        SubscripcionFarmatifyDeletePopupComponent
    ],
    entryComponents: [
        SubscripcionFarmatifyComponent,
        SubscripcionFarmatifyUpdateComponent,
        SubscripcionFarmatifyDeleteDialogComponent,
        SubscripcionFarmatifyDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifySubscripcionFarmatifyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
