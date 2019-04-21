/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { FarmaciaFarmatifyUpdateComponent } from 'app/entities/farmacia-farmatify/farmacia-farmatify-update.component';
import { FarmaciaFarmatifyService } from 'app/entities/farmacia-farmatify/farmacia-farmatify.service';
import { FarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';

describe('Component Tests', () => {
    describe('FarmaciaFarmatify Management Update Component', () => {
        let comp: FarmaciaFarmatifyUpdateComponent;
        let fixture: ComponentFixture<FarmaciaFarmatifyUpdateComponent>;
        let service: FarmaciaFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [FarmaciaFarmatifyUpdateComponent]
            })
                .overrideTemplate(FarmaciaFarmatifyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FarmaciaFarmatifyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FarmaciaFarmatifyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FarmaciaFarmatify(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.farmacia = entity;
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
                    const entity = new FarmaciaFarmatify();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.farmacia = entity;
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
