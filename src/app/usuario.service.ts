import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Proyecto } from './Models/Proyecto/proyecto';
import { Skill } from './Models/Skills/skill';
import { Idioma } from './Models/Idioma/idioma';
import { Educacion } from './Models/Educacion/educacion';
import { Experiencia } from './Models/Experiencia/experiencia';
import { Interes } from './Models/Interes/interes';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private baseUrl = "https://portfolio-backend-production-71d5.up.railway.app/api/v1";//portfolio-backend
  // private baseUrl = "https://portfolio-backend-ap-production.up.railway.app/api/v1";// portfolio-backend-ap
  //private baseUrl = "http://localhost:8080/api/v1";
  
  constructor(private httpClient : HttpClient) { }



  //metodo de obtener todos los usuarios
  obtenerListaUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  obtenerUsuarioPorNombre(nombreUsuario:string): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuario?nombreusuario=${nombreUsuario}`);
  }

  //este metodo sirve para actualizar el proyecto del usuario
  actualizarProyectoUsuario(id:number,proyecto:Proyecto) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/editarproyectousuario/${id}`,proyecto);
  }

  //metodo para obtener o buscar un usuario segun su id
  obtenerUsuarioPorId(id:number):Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuario/${id}`);
  }

  //metodo para eliminar proyecto de usuario
  eliminarProyectoUsuario(id:number):Observable<Usuario>{
    return this.httpClient.delete<Usuario>(`${this.baseUrl}/eliminarProyectoUsuario/${id}`);
  }

  //SKILLS

  nuevaSkillUsuario(id:number,skill:Skill):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/nuevaSkillUsuario/${id}`,skill);
  }

  //NO ANDA AUN
  actualizarSkillUsuario(id:number,skill:Skill) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/editarSkillUsuario/${id}`,skill);
  }

  eliminarSkillUsuario(id:number):Observable<Skill>{
    return this.httpClient.delete<Skill>(`${this.baseUrl}/eliminarSkillUsuario/${id}`);
  }


  //IDIOMAS

  nuevoIdiomaUsuario(id:number,idioma:Idioma):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/nuevoIdiomaUsuario/${id}`,idioma);
  }

  actualizarIdiomaUsuario(id:number,idioma:Idioma) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/editarIdiomaUsuario/${id}`,idioma);
  }

  eliminarIdiomaUsuario(id:number):Observable<Idioma>{
    return this.httpClient.delete<Idioma>(`${this.baseUrl}/eliminarIdiomaUsuario/${id}`);
  }


  //EDUACION

  nuevaEducacionUsuario(id:number,eduacion:Educacion):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/nuevoEducacionUsuario/${id}`,eduacion);
  }

  actualizarEducacionUsuario(id:number,eduacion:Educacion) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/editarEducacionUsuario/${id}`,eduacion);
  }

  eliminarEducacionUsuario(id:number):Observable<Educacion>{
    return this.httpClient.delete<Educacion>(`${this.baseUrl}/eliminarEducacionUsuario/${id}`);
  }


  //EXP

  nuevaExperienciaUsuario(id:number,experiencia:Experiencia):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/nuevaExperienciaUsuario/${id}`,experiencia);
  }

  actualizarExperienciaUsuario(id:number,experiencia:Experiencia) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/editarExperienciaUsuario/${id}`,experiencia);
  }

  eliminarExperienciaUsuario(id:number):Observable<Experiencia>{
    return this.httpClient.delete<Experiencia>(`${this.baseUrl}/eliminarExperienciaUsuario/${id}`);
  }


  //INTERERSES

  nuevoInteresUsuario(id:number,interes:Interes):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/nuevoInteresUsuario/${id}`,interes);
  }

  actualizarInteresUsuario(id:number,interes:Interes) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/editarInteresUsuario/${id}`,interes);
  }

  eliminarInteresUsuario(id:number):Observable<Interes>{
    return this.httpClient.delete<Interes>(`${this.baseUrl}/eliminarInteresUsuario/${id}`);
  }


  //USUARIO

  actualizarDatosUsuario(id:number,usuario:Usuario) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/editarDatosUsuario`,usuario);
  }

  //LOGIN
  login(usuario:Usuario):Observable<Object>{
    // return this.httpClient.post(`${this.baseUrl}/login`,usuario);
    const body = JSON.stringify(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`http://localhost:8080/login`, usuario);
  }

}
