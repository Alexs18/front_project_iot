import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from 'src/app/pages/user/user.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
      path:'',
      component:MainComponent,
      children:[
        {
          path:'Administracion',
          component:UserComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
