/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmatifyTestModule } from '../../../test.module';
import { SubscripcionFarmatifyComponent } from 'app/entities/subscripcion-farmatify/subscripcion-farmatify.component';
import { SubscripcionFarmatifyService } from 'app/entities/subscripcion-farmatify/subscripcion-farmatify.service';
import { SubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

describe('Component Tests', () => {
    describe('SubscripcionFarmatify Management Component', () => {
        let comp: SubscripcionFarmatifyComponent;
        let fixture: ComponentFixture<SubscripcionFarmatifyComponent>;
        let service: SubscripcionFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [SubscripcionFarmatifyComponent],
                providers: []
            })
                .overrideTemplate(SubscripcionFarmatifyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubscripcionFarmatifyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionFarmatifyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SubscripcionFarmatify(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.subscripcions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
