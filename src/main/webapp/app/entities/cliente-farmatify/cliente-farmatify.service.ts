import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClienteFarmatify } from 'app/shared/model/cliente-farmatify.model';

type EntityResponseType = HttpResponse<IClienteFarmatify>;
type EntityArrayResponseType = HttpResponse<IClienteFarmatify[]>;

@Injectable({ providedIn: 'root' })
export class ClienteFarmatifyService {
    public resourceUrl = SERVER_API_URL + 'api/clientes';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/clientes';

    constructor(protected http: HttpClient) {}

    create(cliente: IClienteFarmatify): Observable<EntityResponseType> {
        return this.http.post<IClienteFarmatify>(this.resourceUrl, cliente, { observe: 'response' });
    }

    update(cliente: IClienteFarmatify): Observable<EntityResponseType> {
        return this.http.put<IClienteFarmatify>(this.resourceUrl, cliente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClienteFarmatify>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClienteFarmatify[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClienteFarmatify[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
