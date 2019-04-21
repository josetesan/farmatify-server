import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFarmaciaFarmatify } from 'app/shared/model/farmacia-farmatify.model';

type EntityResponseType = HttpResponse<IFarmaciaFarmatify>;
type EntityArrayResponseType = HttpResponse<IFarmaciaFarmatify[]>;

@Injectable({ providedIn: 'root' })
export class FarmaciaFarmatifyService {
    public resourceUrl = SERVER_API_URL + 'api/farmacias';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/farmacias';

    constructor(protected http: HttpClient) {}

    create(farmacia: IFarmaciaFarmatify): Observable<EntityResponseType> {
        return this.http.post<IFarmaciaFarmatify>(this.resourceUrl, farmacia, { observe: 'response' });
    }

    update(farmacia: IFarmaciaFarmatify): Observable<EntityResponseType> {
        return this.http.put<IFarmaciaFarmatify>(this.resourceUrl, farmacia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFarmaciaFarmatify>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFarmaciaFarmatify[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFarmaciaFarmatify[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
