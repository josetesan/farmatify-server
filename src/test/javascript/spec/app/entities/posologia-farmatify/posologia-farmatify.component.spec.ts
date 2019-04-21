/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmatifyTestModule } from '../../../test.module';
import { PosologiaFarmatifyComponent } from 'app/entities/posologia-farmatify/posologia-farmatify.component';
import { PosologiaFarmatifyService } from 'app/entities/posologia-farmatify/posologia-farmatify.service';
import { PosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

describe('Component Tests', () => {
    describe('PosologiaFarmatify Management Component', () => {
        let comp: PosologiaFarmatifyComponent;
        let fixture: ComponentFixture<PosologiaFarmatifyComponent>;
        let service: PosologiaFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [PosologiaFarmatifyComponent],
                providers: []
            })
                .overrideTemplate(PosologiaFarmatifyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PosologiaFarmatifyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PosologiaFarmatifyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PosologiaFarmatify(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.posologias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
