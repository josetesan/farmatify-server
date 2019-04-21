/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { MedicamentoFarmatifyUpdateComponent } from 'app/entities/medicamento-farmatify/medicamento-farmatify-update.component';
import { MedicamentoFarmatifyService } from 'app/entities/medicamento-farmatify/medicamento-farmatify.service';
import { MedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

describe('Component Tests', () => {
    describe('MedicamentoFarmatify Management Update Component', () => {
        let comp: MedicamentoFarmatifyUpdateComponent;
        let fixture: ComponentFixture<MedicamentoFarmatifyUpdateComponent>;
        let service: MedicamentoFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [MedicamentoFarmatifyUpdateComponent]
            })
                .overrideTemplate(MedicamentoFarmatifyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedicamentoFarmatifyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicamentoFarmatifyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MedicamentoFarmatify(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medicamento = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MedicamentoFarmatify();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medicamento = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
