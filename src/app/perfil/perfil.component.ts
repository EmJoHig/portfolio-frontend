import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Usuario } from '../usuario'; 
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  fechaNacFormat:string;
  constructor(private route: ActivatedRoute, private usuarioServicio: UsuarioService, private router: Router) { }
  
  ngOnInit(): void {
    this.usuarioServicio.obtenerUsuarioPorNombre("apaulini").subscribe(dato => {
      this.usuario = dato;
      // console.log(dato);
    }, error => console.log(error));

  }
  
  editarPerfil(id?:number){
    this.router.navigate(['edicion-perfil', id]);
  }

}

