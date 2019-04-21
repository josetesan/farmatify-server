/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { UsuarioFarmatifyUpdateComponent } from 'app/entities/usuario-farmatify/usuario-farmatify-update.component';
import { UsuarioFarmatifyService } from 'app/entities/usuario-farmatify/usuario-farmatify.service';
import { UsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';

describe('Component Tests', () => {
    describe('UsuarioFarmatify Management Update Component', () => {
        let comp: UsuarioFarmatifyUpdateComponent;
        let fixture: ComponentFixture<UsuarioFarmatifyUpdateComponent>;
        let service: UsuarioFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [UsuarioFarmatifyUpdateComponent]
            })
                .overrideTemplate(UsuarioFarmatifyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsuarioFarmatifyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioFarmatifyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UsuarioFarmatify(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usuario = entity;
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
                    const entity = new UsuarioFarmatify();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usuario = entity;
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
