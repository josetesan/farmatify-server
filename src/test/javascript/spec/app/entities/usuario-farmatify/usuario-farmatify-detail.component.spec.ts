/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { UsuarioFarmatifyDetailComponent } from 'app/entities/usuario-farmatify/usuario-farmatify-detail.component';
import { UsuarioFarmatify } from 'app/shared/model/usuario-farmatify.model';

describe('Component Tests', () => {
    describe('UsuarioFarmatify Management Detail Component', () => {
        let comp: UsuarioFarmatifyDetailComponent;
        let fixture: ComponentFixture<UsuarioFarmatifyDetailComponent>;
        const route = ({ data: of({ usuario: new UsuarioFarmatify(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [UsuarioFarmatifyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UsuarioFarmatifyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsuarioFarmatifyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.usuario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
