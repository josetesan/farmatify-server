/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { FarmaciaFarmatifyDetailComponent } from 'app/entities/farmacia-farmatify/farmacia-farmatify-detail.component';
import { FarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';

describe('Component Tests', () => {
    describe('FarmaciaFarmatify Management Detail Component', () => {
        let comp: FarmaciaFarmatifyDetailComponent;
        let fixture: ComponentFixture<FarmaciaFarmatifyDetailComponent>;
        const route = ({ data: of({ farmacia: new FarmaciaFarmatify(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [FarmaciaFarmatifyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FarmaciaFarmatifyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FarmaciaFarmatifyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.farmacia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
