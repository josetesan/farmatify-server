/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmatifyTestModule } from '../../../test.module';
import { FarmaciaFarmatifyDeleteDialogComponent } from 'app/entities/farmacia-farmatify/farmacia-farmatify-delete-dialog.component';
import { FarmaciaFarmatifyService } from 'app/entities/farmacia-farmatify/farmacia-farmatify.service';

describe('Component Tests', () => {
    describe('FarmaciaFarmatify Management Delete Component', () => {
        let comp: FarmaciaFarmatifyDeleteDialogComponent;
        let fixture: ComponentFixture<FarmaciaFarmatifyDeleteDialogComponent>;
        let service: FarmaciaFarmatifyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [FarmaciaFarmatifyDeleteDialogComponent]
            })
                .overrideTemplate(FarmaciaFarmatifyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FarmaciaFarmatifyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FarmaciaFarmatifyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
