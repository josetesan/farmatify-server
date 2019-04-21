/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MedicamentoFarmatifyService } from 'app/entities/medicamento-farmatify/medicamento-farmatify.service';
import { IMedicamentoFarmatify, MedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

describe('Service Tests', () => {
    describe('MedicamentoFarmatify Service', () => {
        let injector: TestBed;
        let service: MedicamentoFarmatifyService;
        let httpMock: HttpTestingController;
        let elemDefault: IMedicamentoFarmatify;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MedicamentoFarmatifyService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new MedicamentoFarmatify(0, 'AAAAAAA', 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a MedicamentoFarmatify', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new MedicamentoFarmatify(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MedicamentoFarmatify', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        stock: 1,
                        pvp: 1,
                        unidades: 1
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of MedicamentoFarmatify', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        stock: 1,
                        pvp: 1,
                        unidades: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a MedicamentoFarmatify', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
