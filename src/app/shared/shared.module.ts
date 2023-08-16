import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    NgSelectModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    FontAwesomeModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[
    MatToolbarModule,
    MatIconModule,
    NgSelectModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule

  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class SharedModule { }
