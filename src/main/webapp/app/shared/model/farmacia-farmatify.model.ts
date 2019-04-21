import { IStockFarmatify } from 'app/shared/model/stock-farmatify.model';
import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

export interface IFarmaciaFarmatify {
    id?: number;
    calle?: string;
    codigoPostal?: string;
    ciudad?: string;
    provincia?: string;
    titular?: string;
    stocks?: IStockFarmatify[];
    subscripciones?: ISubscripcionFarmatify[];
}

export class FarmaciaFarmatify implements IFarmaciaFarmatify {
    constructor(
        public id?: number,
        public calle?: string,
        public codigoPostal?: string,
        public ciudad?: string,
        public provincia?: string,
        public titular?: string,
        public stocks?: IStockFarmatify[],
        public subscripciones?: ISubscripcionFarmatify[]
    ) {}
}
