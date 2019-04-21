/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { ClienteFarmatifyUpdateComponent } from 'app/entities/cliente-farmatify/cliente-farmatify-update.component';
import { ClienteFarmatifyService } from 'app/entities/cliente-farmatify/cliente-farmatify.service';
import { ClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';

describe('Component Tests', () => {
    describe('ClienteFarmatify Management Update Component', () => {
        let comp: ClienteFarmatifyUpdateComponent;
        let fixture: ComponentFixture<ClienteFarmatifyUpdateComponent>;
        let service: ClienteFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [ClienteFarmatifyUpdateComponent]
            })
                .overrideTemplate(ClienteFarmatifyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClienteFarmatifyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClienteFarmatifyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ClienteFarmatify(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cliente = entity;
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
                    const entity = new ClienteFarmatify();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cliente = entity;
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
