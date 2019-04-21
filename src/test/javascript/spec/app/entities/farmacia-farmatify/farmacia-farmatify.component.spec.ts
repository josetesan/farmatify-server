/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FarmatifyTestModule } from '../../../test.module';
import { FarmaciaFarmatifyComponent } from 'app/entities/farmacia-farmatify/farmacia-farmatify.component';
import { FarmaciaFarmatifyService } from 'app/entities/farmacia-farmatify/farmacia-farmatify.service';
import { FarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';

describe('Component Tests', () => {
    describe('FarmaciaFarmatify Management Component', () => {
        let comp: FarmaciaFarmatifyComponent;
        let fixture: ComponentFixture<FarmaciaFarmatifyComponent>;
        let service: FarmaciaFarmatifyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [FarmaciaFarmatifyComponent],
                providers: []
            })
                .overrideTemplate(FarmaciaFarmatifyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FarmaciaFarmatifyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FarmaciaFarmatifyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FarmaciaFarmatify(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.farmacias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
