/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmatifyTestModule } from '../../../test.module';
import { UsuarioFarmatifyComponent } from 'app/entities/usuario-farmatify/usuario-farmatify.component';
import { UsuarioFarmatifyService } from 'app/entities/usuario-farmatify/usuario-farmatify.service';
import { UsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';

describe('Component Tests', () => {
    describe('UsuarioFarmatify Management Component', () => {
        let comp: UsuarioFarmatifyComponent;
        let fixture: ComponentFixture<UsuarioFarmatifyComponent>;
        let service: UsuarioFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [UsuarioFarmatifyComponent],
                providers: []
            })
                .overrideTemplate(UsuarioFarmatifyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsuarioFarmatifyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioFarmatifyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UsuarioFarmatify(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.usuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
