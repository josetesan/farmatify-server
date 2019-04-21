/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { PosologiaFarmatifyDetailComponent } from 'app/entities/posologia-farmatify/posologia-farmatify-detail.component';
import { PosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

describe('Component Tests', () => {
    describe('PosologiaFarmatify Management Detail Component', () => {
        let comp: PosologiaFarmatifyDetailComponent;
        let fixture: ComponentFixture<PosologiaFarmatifyDetailComponent>;
        const route = ({ data: of({ posologia: new PosologiaFarmatify(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [PosologiaFarmatifyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PosologiaFarmatifyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PosologiaFarmatifyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.posologia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
