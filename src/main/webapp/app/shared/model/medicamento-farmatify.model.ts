import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

export interface IMedicamentoFarmatify {
    id?: number;
    nombre?: string;
    pvp?: number;
    unidades?: number;
    stockId?: number;
    posologias?: IPosologiaFarmatify[];
}

export class MedicamentoFarmatify implements IMedicamentoFarmatify {
    constructor(
        public id?: number,
        public nombre?: string,
        public pvp?: number,
        public unidades?: number,
        public stockId?: number,
        public posologias?: IPosologiaFarmatify[]
    ) {}
}
