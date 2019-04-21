/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmatifyTestModule } from '../../../test.module';
import { SubscripcionFarmatifyDeleteDialogComponent } from 'app/entities/subscripcion-farmatify/subscripcion-farmatify-delete-dialog.component';
import { SubscripcionFarmatifyService } from 'app/entities/subscripcion-farmatify/subscripcion-farmatify.service';

describe('Component Tests', () => {
    describe('SubscripcionFarmatify Management Delete Component', () => {
        let comp: SubscripcionFarmatifyDeleteDialogComponent;
        let fixture: ComponentFixture<SubscripcionFarmatifyDeleteDialogComponent>;
        let service: SubscripcionFarmatifyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [SubscripcionFarmatifyDeleteDialogComponent]
            })
                .overrideTemplate(SubscripcionFarmatifyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubscripcionFarmatifyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionFarmatifyService);
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
