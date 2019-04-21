import { IPosologiaFarmatify } from 'app/shared/model/posologia-farmatify.model';

export interface IMedicamentoFarmatify {
    id?: number;
    nombre?: string;
    stock?: number;
    pvp?: number;
    unidades?: number;
    posologias?: IPosologiaFarmatify[];
    subscripcionId?: number;
}

export class MedicamentoFarmatify implements IMedicamentoFarmatify {
    constructor(
        public id?: number,
        public nombre?: string,
        public stock?: number,
        public pvp?: number,
        public unidades?: number,
        public posologias?: IPosologiaFarmatify[],
        public subscripcionId?: number
    ) {}
}
