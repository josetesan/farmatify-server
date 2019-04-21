import { ISubscripcionFarmatify } from 'app/shared/model/subscripcion-farmatify.model';

export interface IUsuarioFarmatify {
    id?: number;
    usuario?: string;
    password?: string;
    nombre?: string;
    subscripciones?: ISubscripcionFarmatify[];
}

export class UsuarioFarmatify implements IUsuarioFarmatify {
    constructor(
        public id?: number,
        public usuario?: string,
        public password?: string,
        public nombre?: string,
        public subscripciones?: ISubscripcionFarmatify[]
    ) {}
}
