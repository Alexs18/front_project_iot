import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[
    MatToolbarModule,
    MatIconModule,
  ]
})
export class SharedModule { }
