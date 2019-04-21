/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { StockFarmatifyDetailComponent } from 'app/entities/stock-farmatify/stock-farmatify-detail.component';
import { StockFarmatify } from 'app/shared/model/stock-farmatify.model';

describe('Component Tests', () => {
    describe('StockFarmatify Management Detail Component', () => {
        let comp: StockFarmatifyDetailComponent;
        let fixture: ComponentFixture<StockFarmatifyDetailComponent>;
        const route = ({ data: of({ stock: new StockFarmatify(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [StockFarmatifyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StockFarmatifyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StockFarmatifyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stock).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
