import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

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
        const copy = this.convertDateFromClient(subscripcion);
        return this.http
            .post<ISubscripcionFarmatify>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(subscripcion: ISubscripcionFarmatify): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subscripcion);
        return this.http
            .put<ISubscripcionFarmatify>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISubscripcionFarmatify>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISubscripcionFarmatify[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISubscripcionFarmatify[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(subscripcion: ISubscripcionFarmatify): ISubscripcionFarmatify {
        const copy: ISubscripcionFarmatify = Object.assign({}, subscripcion, {
            fechaInicio: subscripcion.fechaInicio != null && subscripcion.fechaInicio.isValid() ? subscripcion.fechaInicio.toJSON() : null,
            fechaFin: subscripcion.fechaFin != null && subscripcion.fechaFin.isValid() ? subscripcion.fechaFin.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaInicio = res.body.fechaInicio != null ? moment(res.body.fechaInicio) : null;
            res.body.fechaFin = res.body.fechaFin != null ? moment(res.body.fechaFin) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((subscripcion: ISubscripcionFarmatify) => {
                subscripcion.fechaInicio = subscripcion.fechaInicio != null ? moment(subscripcion.fechaInicio) : null;
                subscripcion.fechaFin = subscripcion.fechaFin != null ? moment(subscripcion.fechaFin) : null;
            });
        }
        return res;
    }
}
