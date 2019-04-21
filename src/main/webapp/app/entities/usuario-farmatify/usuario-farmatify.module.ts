import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FarmatifySharedModule } from 'app/shared';
import {
    UsuarioFarmatifyComponent,
    UsuarioFarmatifyDetailComponent,
    UsuarioFarmatifyUpdateComponent,
    UsuarioFarmatifyDeletePopupComponent,
    UsuarioFarmatifyDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute
} from './';

const ENTITY_STATES = [...usuarioRoute, ...usuarioPopupRoute];

@NgModule({
    imports: [FarmatifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UsuarioFarmatifyComponent,
        UsuarioFarmatifyDetailComponent,
        UsuarioFarmatifyUpdateComponent,
        UsuarioFarmatifyDeleteDialogComponent,
        UsuarioFarmatifyDeletePopupComponent
    ],
    entryComponents: [
        UsuarioFarmatifyComponent,
        UsuarioFarmatifyUpdateComponent,
        UsuarioFarmatifyDeleteDialogComponent,
        UsuarioFarmatifyDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifyUsuarioFarmatifyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
