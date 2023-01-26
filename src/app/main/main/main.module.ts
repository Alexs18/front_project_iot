import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { UserComponent } from 'src/app/pages/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    MainRoutingModule,
    SharedModule,
    MatPaginatorModule
  ],
  exports:[
    UserComponent,
  ]
})
export class MainModule { }
