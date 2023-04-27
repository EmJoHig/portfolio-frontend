import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { Proyecto } from '../Models/Proyecto/proyecto';
import { Skill } from '../Models/Skills/skill';
import { Idioma } from '../Models/Idioma/idioma';
import { Educacion } from '../Models/Educacion/educacion';
import { Experiencia } from '../Models/Experiencia/experiencia';
import { Interes } from '../Models/Interes/interes';

import { UsuarioService } from '../usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicion-perfil',
  templateUrl: './edicion-perfil.component.html',
  styleUrls: ['./edicion-perfil.component.css']
})
export class EdicionPerfilComponent implements OnInit {

  @ViewChild('modalNuevaExperiencia') modal: ElementRef;
  @ViewChild('modalNuevoInteres') modalInteres: ElementRef;
  @ViewChild('modalNuevoDatosUsuario') modalDatosUsuario: ElementRef;

  usuario: Usuario;
  id: number;

  //modelosIdsEliminar
  proyectoAEliminar: number;
  skillAEliminar: number;
  idiomaAEliminar: number;
  educacionAEliminar: number;
  experienciaAEliminar: number;
  interesAEliminar: number;

  //FORMS
  formProyecto: FormGroup = new FormGroup({});
  formSkill: FormGroup = new FormGroup({});
  formIdioma: FormGroup = new FormGroup({});
  formEducacion: FormGroup = new FormGroup({});
  formExperiencia: FormGroup = new FormGroup({});
  formInteres: FormGroup = new FormGroup({});
  formDatosUsuario: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private usuarioServicio: UsuarioService, private router: Router,private backdropRef: ElementRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // console.log('id desde edicion perfil');
    // console.log(this.id);
    this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
      this.usuario = dato;
      // console.log(dato);
    }, error => console.log(error));

    this.formProyecto = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [''],
      link: [''],
    });

    this.formSkill = this.fb.group({
      nombre: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });

    this.formIdioma = this.fb.group({
      nombre: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });

    this.formEducacion = this.fb.group({
      nombre: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      titulocarrera: ['', Validators.required],
    });

    this.formExperiencia = this.fb.group({
      titulo: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      actividades: ['', Validators.required],
    });

    this.formInteres = this.fb.group({
      descripcion: ['', Validators.required],
    });

    this.formDatosUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      titulo: ['', Validators.required],
    });
  }


  //PROYECTOS
  //GUARDAR EDICION PROYECTO
  guardarEdicionProyecto() {
    if (this.formProyecto.invalid) {
      this.formProyecto.markAllAsTouched();
      for (const key in this.formProyecto.controls) {
        this.formProyecto.controls[key].markAsDirty();
      }
      return;
    }

    // this.formProyecto.value.id = this.id;
    this.usuarioServicio.actualizarProyectoUsuario(this.id, this.formProyecto.value).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));

    }, error => console.log(error));

  }

  cargarFormProy(proyecto: Proyecto) {
    let fecha = new Date(proyecto.fecha);
    const fechaISO = fecha.toISOString().substring(0, 10);
    this.formProyecto = this.fb.group({
      id: [proyecto?.id],
      nombre: [proyecto?.nombre, Validators.required],
      fecha: [fechaISO, Validators.required],
      descripcion: [proyecto?.descripcion, Validators.required],
      imagen: [''],
      link: [proyecto?.link],
    });
  }

  cargarModalProy(id: number) {
    this.proyectoAEliminar = id;
  }


  eliminarProyecto() {
    this.usuarioServicio.eliminarProyectoUsuario(this.proyectoAEliminar).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));
    }, error => console.log(error));
  }




  // SKILLS
  //GUARDAR NUEVA SKILL
  // guardarSkill() {
  //   if (this.formSkill.invalid) {
  //     this.formSkill.markAllAsTouched();
  //     for (const key in this.formSkill.controls) {
  //       this.formSkill.controls[key].markAsDirty();
  //     }
  //     return;
  //   }
  //   // this.formSkill.value.id = this.id;
  //   this.usuarioServicio.nuevaSkillUsuario(this.id, this.formSkill.value).subscribe(dato => {
  //     //busco de nuevo el usuario para ver sus actualizaciones
  //     this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
  //       this.usuario = dato;
  //     }, error => console.log(error));

  //   }, error => console.log(error));

  // }


  guardarSkill() {
    if (this.formSkill.invalid) {
      this.formSkill.markAllAsTouched();
      for (const key in this.formSkill.controls) {
        this.formSkill.controls[key].markAsDirty();
      }
      return;
    }
    else
    {
      if (this.formSkill.value.id != '') {
        //EDICION
        this.usuarioServicio.actualizarSkillUsuario(this.id, this.formSkill.value).subscribe(dato => {
          //busco de nuevo el usuario para ver sus actualizaciones
          this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
            this.usuario = dato;
          }, error => console.log(error));
        }, error => console.log(error));
  
      } else {
        //NUEVO
        this.usuarioServicio.nuevaSkillUsuario(this.id, this.formSkill.value).subscribe(dato => {
          //busco de nuevo el usuario para ver sus actualizaciones
          this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
            this.usuario = dato;
          }, error => console.log(error));
        }, error => console.log(error));
      }

      this.cerrarModal();
    }

  }







  
  //GUARDAR EDICION SKILL
  guardarEdicionSkill() {
    if (this.formSkill.invalid) {
      this.formSkill.markAllAsTouched();
      for (const key in this.formSkill.controls) {
        this.formSkill.controls[key].markAsDirty();
      }
      return;
    }
    // this.formSkill.value.id = this.id;
    // console.log(this.formSkill.value);
    this.usuarioServicio.actualizarSkillUsuario(this.id, this.formSkill.value).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));

    }, error => console.log(error));

  }

  cargarFormSkill(skill: Skill) {
    this.formSkill = this.fb.group({
      id: [skill?.id],
      nombre: [skill?.nombre, Validators.required],
      porcentaje: [skill?.porcentaje, Validators.required],
    });
  }

  cargarModalSkill(id: number) {
    this.skillAEliminar = id;
  }

  eliminarSkill() {
    this.usuarioServicio.eliminarSkillUsuario(this.proyectoAEliminar).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));
    }, error => console.log(error));
  }


  InitFormSkill() {
    this.formSkill = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });
  }



  // IDIOMAS

  //GUARDAR NUEVO IDIOMA
  guardarNuevoIdioma() {
    if (this.formIdioma.invalid) {
      this.formIdioma.markAllAsTouched();
      for (const key in this.formIdioma.controls) {
        this.formIdioma.controls[key].markAsDirty();
      }
      return;
    }
    this.usuarioServicio.nuevoIdiomaUsuario(this.id, this.formIdioma.value).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));

    }, error => console.log(error));

  }

  //GUARDAR EDICION IDIOMAS
  guardarEdicionIdioma() {
    if (this.formIdioma.invalid) {
      this.formIdioma.markAllAsTouched();
      for (const key in this.formIdioma.controls) {
        this.formIdioma.controls[key].markAsDirty();
      }
      return;
    }
    // console.log(this.formIdioma.value)
    this.usuarioServicio.actualizarIdiomaUsuario(this.id, this.formIdioma.value).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));

    }, error => console.log(error));

  }

  cargarFormIdioma(idioma: Idioma) {
    this.formIdioma = this.fb.group({
      id: [idioma?.id],
      nombre: [idioma?.nombre, Validators.required],
      porcentaje: [idioma?.porcentaje, Validators.required],
    });
  }

  cargarModalIdioma(id: number) {
    this.idiomaAEliminar = id;
  }

  InitFormIdioma() {
    this.formIdioma = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      porcentaje: ['', Validators.required],
    });
  }

  eliminarIdioma() {
    this.usuarioServicio.eliminarIdiomaUsuario(this.idiomaAEliminar).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));
    }, error => console.log(error));
  }



  //EDUACION

  //GUARDAR NUEVO EDUACION
  guardarNuevaEducacion() {
    if (this.formEducacion.invalid) {
      this.formEducacion.markAllAsTouched();
      for (const key in this.formEducacion.controls) {
        this.formEducacion.controls[key].markAsDirty();
      }
      return;
    }
    this.usuarioServicio.nuevaEducacionUsuario(this.id, this.formEducacion.value).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));

    }, error => console.log(error));

  }

  //GUARDAR EDICION EDUACION
  guardarEdicionEducacion() {
    if (this.formEducacion.invalid) {
      this.formEducacion.markAllAsTouched();
      for (const key in this.formEducacion.controls) {
        this.formEducacion.controls[key].markAsDirty();
      }
      return;
    }
    // console.log(this.formEducacion.value)
    this.usuarioServicio.actualizarEducacionUsuario(this.id, this.formEducacion.value).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));

    }, error => console.log(error));

  }

  cargarFormEducacion(educacion: Educacion) {

    let fechai = new Date(educacion.fechainicio);
    let fechaf = new Date(educacion.fechafin);
    const fechaISOi = fechai.toISOString().substring(0, 10);
    const fechaISOf = fechaf.toISOString().substring(0, 10);
    this.formEducacion = this.fb.group({
      id: [educacion?.id],
      nombre: [educacion?.nombre, Validators.required],
      fechainicio: [fechaISOi, Validators.required],
      fechafin: [fechaISOf, Validators.required],
      titulocarrera: [educacion?.titulocarrera, Validators.required],
    });
  }

  cargarModalEducacion(id: number) {
    this.educacionAEliminar = id;
  }

  InitFormEducacion() {
    this.formEducacion = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      titulocarrera: ['', Validators.required],
    });
  }

  eliminarEducacion() {
    this.usuarioServicio.eliminarEducacionUsuario(this.educacionAEliminar).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));
    }, error => console.log(error));
  }



  //EXPERIENCIA


  //GUARDAR NUEVO EXPERIENCIA
  guardarExperiencia() {
    if (this.formExperiencia.invalid) {
      this.formExperiencia.markAllAsTouched();
      for (const key in this.formExperiencia.controls) {
        this.formExperiencia.controls[key].markAsDirty();
      }
      return;
    }
    else
    {
      if (this.formExperiencia.value.id != '') {
        //EDICION
        this.usuarioServicio.actualizarExperienciaUsuario(this.id, this.formExperiencia.value).subscribe(dato => {
          //busco de nuevo el usuario para ver sus actualizaciones
          this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
            this.usuario = dato;
          }, error => console.log(error));
        }, error => console.log(error));
  
      } else {
        //NUEVO
        this.usuarioServicio.nuevaExperienciaUsuario(this.id, this.formExperiencia.value).subscribe(dato => {
          //busco de nuevo el usuario para ver sus actualizaciones
          this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
            this.usuario = dato;
          }, error => console.log(error));
        }, error => console.log(error));
      }

      this.cerrarModal();
    }
  }

  //GUARDAR EDICION EXPERIENCIA
  // guardarEdicionExperiencia() {
  //   if (this.formExperiencia.invalid) {
  //     this.formExperiencia.markAllAsTouched();
  //     for (const key in this.formExperiencia.controls) {
  //       this.formExperiencia.controls[key].markAsDirty();
  //     }
  //     return;
  //   }
  //   // console.log(this.formExperiencia.value);
  //   console.log('this.modal');
  //   console.log(this.modal);
  //   this.modal.nativeElement.hide();
  //   this.usuarioServicio.actualizarExperienciaUsuario(this.id, this.formExperiencia.value).subscribe(dato => {
  //     //busco de nuevo el usuario para ver sus actualizaciones
  //     this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
  //       this.usuario = dato;
  //     }, error => console.log(error));

  //   }, error => console.log(error));

  // }

  cargarFormExperiencia(experiencia: Experiencia) {
    let fechai = new Date(experiencia.fechainicio);
    let fechaf = new Date(experiencia.fechafin);
    const fechaISOi = fechai.toISOString().substring(0, 10);
    const fechaISOf = fechaf.toISOString().substring(0, 10);
    this.formExperiencia = this.fb.group({
      id: [experiencia?.id],
      titulo: [experiencia?.titulo, Validators.required],
      fechainicio: [fechaISOi, Validators.required],
      fechafin: [fechaISOf, Validators.required],
      actividades: [experiencia?.actividades, Validators.required],
    });
  }

  cargarModalExperiencia(id: number) {
    this.experienciaAEliminar = id;
  }

  InitFormExperiencia() {
    this.formExperiencia = this.fb.group({
      id: [''],
      titulo: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      actividades: ['', Validators.required],
    });
  }

  eliminarExperiencia() {
    this.usuarioServicio.eliminarExperienciaUsuario(this.experienciaAEliminar).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));
    }, error => console.log(error));
  }



  //INTERESES

  //GUARDAR NUEVO EXPERIENCIA
  guardarInteres() {
    if (this.formInteres.invalid) {
      this.formInteres.markAllAsTouched();
      for (const key in this.formInteres.controls) {
        this.formInteres.controls[key].markAsDirty();
      }
      return;
    }
    else
    {
      if (this.formInteres.value.id != '') {
        //EDICION
        this.usuarioServicio.actualizarInteresUsuario(this.id, this.formInteres.value).subscribe(dato => {
          //busco de nuevo el usuario para ver sus actualizaciones
          this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
            this.usuario = dato;
          }, error => console.log(error));
        }, error => console.log(error));
  
      } else {
        //NUEVO
        this.usuarioServicio.nuevoInteresUsuario(this.id, this.formInteres.value).subscribe(dato => {
          //busco de nuevo el usuario para ver sus actualizaciones
          this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
            this.usuario = dato;
          }, error => console.log(error));
        }, error => console.log(error));
      }

      this.cerrarModal();
    }
  }

  cargarFormInteres(interes: Interes) {
    this.formInteres = this.fb.group({
      id: [interes?.id],
      descripcion: [interes?.descripcion, Validators.required],
    });
  }

  cargarModalInteres(id: number) {
    this.interesAEliminar = id;
  }

  InitFormInteres() {
    this.formInteres = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
    });
  }

  eliminarInteres() {
    // console.log(this.interesAEliminar);
    this.usuarioServicio.eliminarInteresUsuario(this.interesAEliminar).subscribe(dato => {
      //busco de nuevo el usuario para ver sus actualizaciones
      this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
        this.usuario = dato;
      }, error => console.log(error));
    }, error => console.log(error));
  }



//DATOS USUARIO

guardarDatosUsuario() {
  if (this.formDatosUsuario.invalid) {
    this.formDatosUsuario.markAllAsTouched();
    for (const key in this.formDatosUsuario.controls) {
      this.formDatosUsuario.controls[key].markAsDirty();
    }
    return;
  }
  else
  {
    if (this.formDatosUsuario.value.id != '') {
      //EDICION
      this.usuarioServicio.actualizarDatosUsuario(this.id, this.formDatosUsuario.value).subscribe(dato => {
        //busco de nuevo el usuario para ver sus actualizaciones
        this.usuarioServicio.obtenerUsuarioPorId(this.id).subscribe(dato => {
          this.usuario = dato;
        }, error => console.log(error));
      }, error => console.log(error));

    } 

    // this.modalDatosUsuario.nativeElement.classList.remove('show');
    // const modalBackdrop = document.querySelector('.modal-backdrop');
    // modalBackdrop?.classList.remove('fade', 'show', 'modal-backdrop');

    this.cerrarModal();

  }
}

cargarFormDatosUsuario(usuario: Usuario) {
  let fechaN = new Date(usuario.fechaNacimiento);
  const fechaISO = fechaN.toISOString().substring(0, 10);

  this.formDatosUsuario = this.fb.group({
    id: [usuario?.id],
    nombre: [usuario?.nombre, Validators.required],
    apellido: [usuario?.apellido, Validators.required],
    fechaNacimiento: [fechaISO, Validators.required],
    titulo: [usuario?.titulo, Validators.required],
  });
}

InitFormDatosUsuario() {
  this.formDatosUsuario = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    titulo: ['', Validators.required],
  });
}



cerrarModal() {
  this.modalDatosUsuario.nativeElement.click();
  this.modalInteres.nativeElement.click();
  this.modal.nativeElement.click();//proyectos
}

}
