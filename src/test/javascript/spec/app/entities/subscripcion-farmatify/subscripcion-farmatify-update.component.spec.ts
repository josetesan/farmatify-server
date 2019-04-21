/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { SubscripcionFarmatifyUpdateComponent } from 'app/entities/subscripcion-farmatify/subscripcion-farmatify-update.component';
import { SubscripcionFarmatifyService } from 'app/entities/subscripcion-farmatify/subscripcion-farmatify.service';
import { SubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

describe('Component Tests', () => {
    describe('SubscripcionFarmatify Management Update Component', () => {
        let comp: SubscripcionFarmatifyUpdateComponent;
        let fixture: ComponentFixture<SubscripcionFarmatifyUpdateComponent>;
        let service: SubscripcionFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [SubscripcionFarmatifyUpdateComponent]
            })
                .overrideTemplate(SubscripcionFarmatifyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubscripcionFarmatifyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionFarmatifyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubscripcionFarmatify(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subscripcion = entity;
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
                    const entity = new SubscripcionFarmatify();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subscripcion = entity;
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
