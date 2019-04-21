import { Moment } from 'moment';
import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

export interface ISubscripcionFarmatify {
    id?: number;
    fechaInicio?: Moment;
    fechaFin?: Moment;
    farmaciaId?: number;
    usuarioId?: number;
    medicamentos?: IMedicamentoFarmatify[];
}

export class SubscripcionFarmatify implements ISubscripcionFarmatify {
    constructor(
        public id?: number,
        public fechaInicio?: Moment,
        public fechaFin?: Moment,
        public farmaciaId?: number,
        public usuarioId?: number,
        public medicamentos?: IMedicamentoFarmatify[]
    ) {}
}
