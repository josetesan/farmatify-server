/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmatifyTestModule } from '../../../test.module';
import { MedicamentoFarmatifyComponent } from 'app/entities/medicamento-farmatify/medicamento-farmatify.component';
import { MedicamentoFarmatifyService } from 'app/entities/medicamento-farmatify/medicamento-farmatify.service';
import { MedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

describe('Component Tests', () => {
    describe('MedicamentoFarmatify Management Component', () => {
        let comp: MedicamentoFarmatifyComponent;
        let fixture: ComponentFixture<MedicamentoFarmatifyComponent>;
        let service: MedicamentoFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [MedicamentoFarmatifyComponent],
                providers: []
            })
                .overrideTemplate(MedicamentoFarmatifyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedicamentoFarmatifyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicamentoFarmatifyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MedicamentoFarmatify(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.medicamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
