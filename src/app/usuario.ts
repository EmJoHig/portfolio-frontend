import { Interes } from './Models/Interes/interes';
import { Experiencia } from './Models/Experiencia/experiencia';
import { Educacion } from './Models/Educacion/educacion';
import { Skill } from './Models/Skills/skill';
import { Proyecto } from './Models/Proyecto/proyecto';
import { Idioma } from './Models/Idioma/idioma';

export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    titulo: string;
    nombreusuario: string;
    contrasena: string;
    informacionPersonal: string;
    imagenUsuario: string;
    fechaNacimiento: Date;
    mail:string;
    intereses:Interes[];
    experiencias:Experiencia[];
    educaciones:Educacion[];
    skills:Skill[];
    proyectos:Proyecto[];
    idiomas:Idioma[];
}
