import { Usuario } from '../../usuario'; 

export class Proyecto {
    id: number;
    nombre: string;
    fecha: Date;
    link: string;
    descripcion: string;
    usuario: Usuario;
    imagen: string[];
}
