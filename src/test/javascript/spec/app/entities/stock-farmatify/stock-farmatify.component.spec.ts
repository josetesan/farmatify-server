/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmatifyTestModule } from '../../../test.module';
import { StockFarmatifyComponent } from 'app/entities/stock-farmatify/stock-farmatify.component';
import { StockFarmatifyService } from 'app/entities/stock-farmatify/stock-farmatify.service';
import { StockFarmatify } from 'app/shared/model/stock-farmatify.model';

describe('Component Tests', () => {
    describe('StockFarmatify Management Component', () => {
        let comp: StockFarmatifyComponent;
        let fixture: ComponentFixture<StockFarmatifyComponent>;
        let service: StockFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [StockFarmatifyComponent],
                providers: []
            })
                .overrideTemplate(StockFarmatifyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StockFarmatifyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockFarmatifyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StockFarmatify(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.stocks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
