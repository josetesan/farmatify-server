/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FarmatifyTestModule } from '../../../test.module';
import { ClienteFarmatifyDetailComponent } from 'app/entities/cliente-farmatify/cliente-farmatify-detail.component';
import { ClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';

describe('Component Tests', () => {
    describe('ClienteFarmatify Management Detail Component', () => {
        let comp: ClienteFarmatifyDetailComponent;
        let fixture: ComponentFixture<ClienteFarmatifyDetailComponent>;
        const route = ({ data: of({ cliente: new ClienteFarmatify(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [ClienteFarmatifyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ClienteFarmatifyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClienteFarmatifyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cliente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
