/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { FarmatifyTestModule } from '../../../test.module';
import { UsuarioFarmatifyDeleteDialogComponent } from 'app/entities/usuario-farmatify/usuario-farmatify-delete-dialog.component';
import { UsuarioFarmatifyService } from 'app/entities/usuario-farmatify/usuario-farmatify.service';

describe('Component Tests', () => {
    describe('UsuarioFarmatify Management Delete Component', () => {
        let comp: UsuarioFarmatifyDeleteDialogComponent;
        let fixture: ComponentFixture<UsuarioFarmatifyDeleteDialogComponent>;
        let service: UsuarioFarmatifyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [FarmatifyTestModule],
                declarations: [UsuarioFarmatifyDeleteDialogComponent]
            })
                .overrideTemplate(UsuarioFarmatifyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsuarioFarmatifyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioFarmatifyService);
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
