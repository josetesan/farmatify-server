import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';

type EntityResponseType = HttpResponse<IStockFarmatify>;
type EntityArrayResponseType = HttpResponse<IStockFarmatify[]>;

@Injectable({ providedIn: 'root' })
export class StockFarmatifyService {
    public resourceUrl = SERVER_API_URL + 'api/stocks';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/stocks';

    constructor(protected http: HttpClient) {}

    create(stock: IStockFarmatify): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stock);
        return this.http
            .post<IStockFarmatify>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(stock: IStockFarmatify): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stock);
        return this.http
            .put<IStockFarmatify>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStockFarmatify>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStockFarmatify[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStockFarmatify[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(stock: IStockFarmatify): IStockFarmatify {
        const copy: IStockFarmatify = Object.assign({}, stock, {
            fechaRepuesta: stock.fechaRepuesta != null && stock.fechaRepuesta.isValid() ? stock.fechaRepuesta.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaRepuesta = res.body.fechaRepuesta != null ? moment(res.body.fechaRepuesta) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((stock: IStockFarmatify) => {
                stock.fechaRepuesta = stock.fechaRepuesta != null ? moment(stock.fechaRepuesta) : null;
            });
        }
        return res;
    }
}
