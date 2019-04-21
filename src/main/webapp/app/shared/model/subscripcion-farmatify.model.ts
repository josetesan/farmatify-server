import { IMedicamentoFarmatify } from 'app/shared/model/medicamento-farmatify.model';

export interface ISubscripcionFarmatify {
    id?: number;
    idMedicamento?: number;
    idCliente?: number;
    idFarmacia?: number;
    farmaciaId?: number;
    clienteId?: number;
    idMedicamentoId?: number;
    idFarmaciaId?: number;
    idClienteId?: number;
    idMedicamentos?: IMedicamentoFarmatify[];
}

export class SubscripcionFarmatify implements ISubscripcionFarmatify {
    constructor(
        public id?: number,
        public idMedicamento?: number,
        public idCliente?: number,
        public idFarmacia?: number,
        public farmaciaId?: number,
        public clienteId?: number,
        public idMedicamentoId?: number,
        public idFarmaciaId?: number,
        public idClienteId?: number,
        public idMedicamentos?: IMedicamentoFarmatify[]
    ) {}
}
