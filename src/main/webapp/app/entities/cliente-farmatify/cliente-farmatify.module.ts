import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FarmatifySharedModule } from 'app/shared';
import {
    ClienteFarmatifyComponent,
    ClienteFarmatifyDetailComponent,
    ClienteFarmatifyUpdateComponent,
    ClienteFarmatifyDeletePopupComponent,
    ClienteFarmatifyDeleteDialogComponent,
    clienteRoute,
    clientePopupRoute
} from './';

const ENTITY_STATES = [...clienteRoute, ...clientePopupRoute];

@NgModule({
    imports: [FarmatifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClienteFarmatifyComponent,
        ClienteFarmatifyDetailComponent,
        ClienteFarmatifyUpdateComponent,
        ClienteFarmatifyDeleteDialogComponent,
        ClienteFarmatifyDeletePopupComponent
    ],
    entryComponents: [
        ClienteFarmatifyComponent,
        ClienteFarmatifyUpdateComponent,
        ClienteFarmatifyDeleteDialogComponent,
        ClienteFarmatifyDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifyClienteFarmatifyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
