/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmatifyTestModule } from '../../../test.module';
import { ClienteFarmatifyComponent } from 'app/entities/cliente-farmatify/cliente-farmatify.component';
import { ClienteFarmatifyService } from 'app/entities/cliente-farmatify/cliente-farmatify.service';
import { ClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';

describe('Component Tests', () => {
    describe('ClienteFarmatify Management Component', () => {
        let comp: ClienteFarmatifyComponent;
        let fixture: ComponentFixture<ClienteFarmatifyComponent>;
        let service: ClienteFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [ClienteFarmatifyComponent],
                providers: []
            })
                .overrideTemplate(ClienteFarmatifyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClienteFarmatifyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClienteFarmatifyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ClienteFarmatify(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.clientes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
