/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmatifyTestModule } from '../../../test.module';
import { StockFarmatifyDeleteDialogComponent } from 'app/entities/stock-farmatify/stock-farmatify-delete-dialog.component';
import { StockFarmatifyService } from 'app/entities/stock-farmatify/stock-farmatify.service';

describe('Component Tests', () => {
    describe('StockFarmatify Management Delete Component', () => {
        let comp: StockFarmatifyDeleteDialogComponent;
        let fixture: ComponentFixture<StockFarmatifyDeleteDialogComponent>;
        let service: StockFarmatifyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [StockFarmatifyDeleteDialogComponent]
            })
                .overrideTemplate(StockFarmatifyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StockFarmatifyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StockFarmatifyService);
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
