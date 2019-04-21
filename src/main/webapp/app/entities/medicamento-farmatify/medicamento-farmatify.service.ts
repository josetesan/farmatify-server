import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

type EntityResponseType = HttpResponse<IMedicamentoFarmatify>;
type EntityArrayResponseType = HttpResponse<IMedicamentoFarmatify[]>;

@Injectable({ providedIn: 'root' })
export class MedicamentoFarmatifyService {
    public resourceUrl = SERVER_API_URL + 'api/medicamentos';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/medicamentos';

    constructor(protected http: HttpClient) {}

    create(medicamento: IMedicamentoFarmatify): Observable<EntityResponseType> {
        return this.http.post<IMedicamentoFarmatify>(this.resourceUrl, medicamento, { observe: 'response' });
    }

    update(medicamento: IMedicamentoFarmatify): Observable<EntityResponseType> {
        return this.http.put<IMedicamentoFarmatify>(this.resourceUrl, medicamento, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMedicamentoFarmatify>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedicamentoFarmatify[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedicamentoFarmatify[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
