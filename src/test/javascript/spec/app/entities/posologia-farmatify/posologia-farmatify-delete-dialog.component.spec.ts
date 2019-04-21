/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmatifyTestModule } from '../../../test.module';
import { PosologiaFarmatifyDeleteDialogComponent } from 'app/entities/posologia-farmatify/posologia-farmatify-delete-dialog.component';
import { PosologiaFarmatifyService } from 'app/entities/posologia-farmatify/posologia-farmatify.service';

describe('Component Tests', () => {
    describe('PosologiaFarmatify Management Delete Component', () => {
        let comp: PosologiaFarmatifyDeleteDialogComponent;
        let fixture: ComponentFixture<PosologiaFarmatifyDeleteDialogComponent>;
        let service: PosologiaFarmatifyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [PosologiaFarmatifyDeleteDialogComponent]
            })
                .overrideTemplate(PosologiaFarmatifyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PosologiaFarmatifyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PosologiaFarmatifyService);
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
