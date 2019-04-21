/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { SubscripcionFarmatifyDetailComponent } from 'app/entities/subscripcion-farmatify/subscripcion-farmatify-detail.component';
import { SubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

describe('Component Tests', () => {
    describe('SubscripcionFarmatify Management Detail Component', () => {
        let comp: SubscripcionFarmatifyDetailComponent;
        let fixture: ComponentFixture<SubscripcionFarmatifyDetailComponent>;
        const route = ({ data: of({ subscripcion: new SubscripcionFarmatify(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [SubscripcionFarmatifyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubscripcionFarmatifyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubscripcionFarmatifyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subscripcion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
