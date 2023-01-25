import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { MedicionesComponent } from './pages/mediciones/mediciones.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SensoresComponent } from './pages/sensores/sensores.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'Home',
    component:HomeComponent,
  },
  {
    path:'Sensors',
    component:SensoresComponent
  },
  {
    path:'Administracion',
    component:UserComponent
  },
  {
    path:'Mediciones',
    component:MedicionesComponent
  },
  {
    path:'Reportes',
    component:ReportesComponent
  },
  {
    path:'Perfil',
    component:PerfilComponent
  },
  {path:'**', redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
