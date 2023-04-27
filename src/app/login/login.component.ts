import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombreUsuario!:string;
  contrasena!:string;

  usuario:Usuario;

  formLogin: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder, private route: ActivatedRoute, private usuarioServicio: UsuarioService, private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
        nombreUsuario: ['', Validators.required],
        contrasena: ['', Validators.required],
      });
  }


  login(){
    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      for (const key in this.formLogin.controls) {
        this.formLogin.controls[key].markAsDirty();
      }
      return;
    }

    this.usuarioServicio.obtenerUsuarioPorNombre(this.formLogin.value.nombreUsuario).subscribe(dato => {
      //obtengo el usuario de la base de datos      
      this.usuario = dato;
      if(dato == null){
        alert("No hay usuario con ese nombre");
      }else{
        // console.log(dato);

        if(this.formLogin.value.contrasena == this.usuario.contrasena){
          this.router.navigate(['edicion-perfil', this.usuario.id]);
        }
        else{
          alert("el nombre o contraseña son incorrectos");
        }
        // this.usuarioServicio.login(this.usuario).subscribe(dato => {
        //   console.log(dato);
        //   if(dato!=null)
        //      this.router.navigate(['edicion-perfil', this.usuario.id]);
        //this.router.navigate(['edicion-perfil', this.usuario.id]);
        // }, error => console.log(error));
      }
    }, error => console.log(error));

    

  }
}
