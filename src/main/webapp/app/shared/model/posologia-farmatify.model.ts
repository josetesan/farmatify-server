export interface IPosologiaFarmatify {
    id?: number;
    dias?: number;
    horas?: number;
    medicamentoId?: number;
}

export class PosologiaFarmatify implements IPosologiaFarmatify {
    constructor(public id?: number, public dias?: number, public horas?: number, public medicamentoId?: number) {}
}
