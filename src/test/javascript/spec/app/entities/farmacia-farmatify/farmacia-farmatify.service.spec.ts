/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FarmaciaFarmatifyService } from 'app/entities/farmacia-farmatify/farmacia-farmatify.service';
import { IFarmaciaFarmatify, FarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';

describe('Service Tests', () => {
    describe('FarmaciaFarmatify Service', () => {
        let injector: TestBed;
        let service: FarmaciaFarmatifyService;
        let httpMock: HttpTestingController;
        let elemDefault: IFarmaciaFarmatify;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FarmaciaFarmatifyService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new FarmaciaFarmatify(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
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

            it('should create a FarmaciaFarmatify', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new FarmaciaFarmatify(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FarmaciaFarmatify', async () => {
                const returnedFromService = Object.assign(
                    {
                        calle: 'BBBBBB',
                        codigoPostal: 'BBBBBB',
                        ciudad: 'BBBBBB',
                        provincia: 'BBBBBB',
                        titular: 'BBBBBB'
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

            it('should return a list of FarmaciaFarmatify', async () => {
                const returnedFromService = Object.assign(
                    {
                        calle: 'BBBBBB',
                        codigoPostal: 'BBBBBB',
                        ciudad: 'BBBBBB',
                        provincia: 'BBBBBB',
                        titular: 'BBBBBB'
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

            it('should delete a FarmaciaFarmatify', async () => {
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
