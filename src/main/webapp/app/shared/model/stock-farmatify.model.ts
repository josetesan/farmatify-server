import { Moment } from 'moment';

export interface IStockFarmatify {
    id?: number;
    unidades?: number;
    fechaRepuesta?: Moment;
    farmaciaId?: number;
}

export class StockFarmatify implements IStockFarmatify {
    constructor(public id?: number, public unidades?: number, public fechaRepuesta?: Moment, public farmaciaId?: number) {}
}
