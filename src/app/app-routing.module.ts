import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { EdicionPerfilComponent } from './edicion-perfil/edicion-perfil.component';


const routes: Routes = [
  {
      path: 'perfil',
      component: PerfilComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'edicion-perfil/:id',
    component: EdicionPerfilComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'perfil'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
