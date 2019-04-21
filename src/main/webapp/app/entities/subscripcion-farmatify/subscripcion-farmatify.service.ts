import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

type EntityResponseType = HttpResponse<ISubscripcionFarmatify>;
type EntityArrayResponseType = HttpResponse<ISubscripcionFarmatify[]>;

@Injectable({ providedIn: 'root' })
export class SubscripcionFarmatifyService {
    public resourceUrl = SERVER_API_URL + 'api/subscripcions';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/subscripcions';

    constructor(protected http: HttpClient) {}

    create(subscripcion: ISubscripcionFarmatify): Observable<EntityResponseType> {
        return this.http.post<ISubscripcionFarmatify>(this.resourceUrl, subscripcion, { observe: 'response' });
    }

    update(subscripcion: ISubscripcionFarmatify): Observable<EntityResponseType> {
        return this.http.put<ISubscripcionFarmatify>(this.resourceUrl, subscripcion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISubscripcionFarmatify>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISubscripcionFarmatify[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISubscripcionFarmatify[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
