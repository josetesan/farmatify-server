import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FarmatifySharedModule } from 'app/shared';
import {
    StockFarmatifyComponent,
    StockFarmatifyDetailComponent,
    StockFarmatifyUpdateComponent,
    StockFarmatifyDeletePopupComponent,
    StockFarmatifyDeleteDialogComponent,
    stockRoute,
    stockPopupRoute
} from './';

const ENTITY_STATES = [...stockRoute, ...stockPopupRoute];

@NgModule({
    imports: [FarmatifySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StockFarmatifyComponent,
        StockFarmatifyDetailComponent,
        StockFarmatifyUpdateComponent,
        StockFarmatifyDeleteDialogComponent,
        StockFarmatifyDeletePopupComponent
    ],
    entryComponents: [
        StockFarmatifyComponent,
        StockFarmatifyUpdateComponent,
        StockFarmatifyDeleteDialogComponent,
        StockFarmatifyDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FarmatifyStockFarmatifyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
