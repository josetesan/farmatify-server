/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { MedicamentoFarmatifyDetailComponent } from 'app/entities/medicamento-farmatify/medicamento-farmatify-detail.component';
import { MedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

describe('Component Tests', () => {
    describe('MedicamentoFarmatify Management Detail Component', () => {
        let comp: MedicamentoFarmatifyDetailComponent;
        let fixture: ComponentFixture<MedicamentoFarmatifyDetailComponent>;
        const route = ({ data: of({ medicamento: new MedicamentoFarmatify(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [MedicamentoFarmatifyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedicamentoFarmatifyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedicamentoFarmatifyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medicamento).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
