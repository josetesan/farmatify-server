/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { PosologiaFarmatifyUpdateComponent } from 'app/entities/posologia-farmatify/posologia-farmatify-update.component';
import { PosologiaFarmatifyService } from 'app/entities/posologia-farmatify/posologia-farmatify.service';
import { PosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

describe('Component Tests', () => {
    describe('PosologiaFarmatify Management Update Component', () => {
        let comp: PosologiaFarmatifyUpdateComponent;
        let fixture: ComponentFixture<PosologiaFarmatifyUpdateComponent>;
        let service: PosologiaFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [PosologiaFarmatifyUpdateComponent]
            })
                .overrideTemplate(PosologiaFarmatifyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PosologiaFarmatifyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PosologiaFarmatifyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PosologiaFarmatify(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.posologia = entity;
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
                    const entity = new PosologiaFarmatify();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.posologia = entity;
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
