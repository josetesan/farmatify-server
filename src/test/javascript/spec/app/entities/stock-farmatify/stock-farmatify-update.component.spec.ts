/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { StockFarmatifyUpdateComponent } from 'app/entities/stock-farmatify/stock-farmatify-update.component';
import { StockFarmatifyService } from 'app/entities/stock-farmatify/stock-farmatify.service';
import { StockFarmatify } from 'app/shared/model/stock-farmatify.model';

describe('Component Tests', () => {
    describe('StockFarmatify Management Update Component', () => {
        let comp: StockFarmatifyUpdateComponent;
        let fixture: ComponentFixture<StockFarmatifyUpdateComponent>;
        let service: StockFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [StockFarmatifyUpdateComponent]
            })
                .overrideTemplate(StockFarmatifyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StockFarmatifyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockFarmatifyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StockFarmatify(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stock = entity;
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
                    const entity = new StockFarmatify();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stock = entity;
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
