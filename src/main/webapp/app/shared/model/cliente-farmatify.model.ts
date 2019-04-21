import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

export interface IClienteFarmatify {
    id?: number;
    usuario?: string;
    password?: string;
    nombre?: string;
    idClientes?: ISubscripcionFarmatify[];
}

export class ClienteFarmatify implements IClienteFarmatify {
    constructor(
        public id?: number,
        public usuario?: string,
        public password?: string,
        public nombre?: string,
        public idClientes?: ISubscripcionFarmatify[]
    ) {}
}
