import { Moment } from 'moment';

export interface ISubscripcionFarmatify {
    id?: number;
    fechaInicio?: Moment;
    fechaFin?: Moment;
    farmaciaId?: number;
    usuarioId?: number;
    medicamentoId?: number;
}

export class SubscripcionFarmatify implements ISubscripcionFarmatify {
    constructor(
        public id?: number,
        public fechaInicio?: Moment,
        public fechaFin?: Moment,
        public farmaciaId?: number,
        public usuarioId?: number,
        public medicamentoId?: number
    ) {}
}
