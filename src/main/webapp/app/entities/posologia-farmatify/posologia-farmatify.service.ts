import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

type EntityResponseType = HttpResponse<IPosologiaFarmatify>;
type EntityArrayResponseType = HttpResponse<IPosologiaFarmatify[]>;

@Injectable({ providedIn: 'root' })
export class PosologiaFarmatifyService {
    public resourceUrl = SERVER_API_URL + 'api/posologias';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/posologias';

    constructor(protected http: HttpClient) {}

    create(posologia: IPosologiaFarmatify): Observable<EntityResponseType> {
        return this.http.post<IPosologiaFarmatify>(this.resourceUrl, posologia, { observe: 'response' });
    }

    update(posologia: IPosologiaFarmatify): Observable<EntityResponseType> {
        return this.http.put<IPosologiaFarmatify>(this.resourceUrl, posologia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPosologiaFarmatify>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPosologiaFarmatify[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPosologiaFarmatify[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
