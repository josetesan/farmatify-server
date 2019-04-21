/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmatifyTestModule } from '../../../test.module';
import { MedicamentoFarmatifyDeleteDialogComponent } from 'app/entities/medicamento-farmatify/medicamento-farmatify-delete-dialog.component';
import { MedicamentoFarmatifyService } from 'app/entities/medicamento-farmatify/medicamento-farmatify.service';

describe('Component Tests', () => {
    describe('MedicamentoFarmatify Management Delete Component', () => {
        let comp: MedicamentoFarmatifyDeleteDialogComponent;
        let fixture: ComponentFixture<MedicamentoFarmatifyDeleteDialogComponent>;
        let service: MedicamentoFarmatifyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [MedicamentoFarmatifyDeleteDialogComponent]
            })
                .overrideTemplate(MedicamentoFarmatifyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedicamentoFarmatifyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicamentoFarmatifyService);
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
