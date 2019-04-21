/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmatifyTestModule } from '../../../test.module';
import { ClienteFarmatifyDeleteDialogComponent } from 'app/entities/cliente-farmatify/cliente-farmatify-delete-dialog.component';
import { ClienteFarmatifyService } from 'app/entities/cliente-farmatify/cliente-farmatify.service';

describe('Component Tests', () => {
    describe('ClienteFarmatify Management Delete Component', () => {
        let comp: ClienteFarmatifyDeleteDialogComponent;
        let fixture: ComponentFixture<ClienteFarmatifyDeleteDialogComponent>;
        let service: ClienteFarmatifyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [ClienteFarmatifyDeleteDialogComponent]
            })
                .overrideTemplate(ClienteFarmatifyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClienteFarmatifyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClienteFarmatifyService);
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
