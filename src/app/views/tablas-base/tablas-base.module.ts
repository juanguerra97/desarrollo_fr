import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumsComponent } from './pensums/pensums.component';
import {TablasBaseRoutes} from './tablas_base.routes';



@NgModule({
  declarations: [PensumsComponent],
  imports: [
    CommonModule,
    TablasBaseRoutes
  ]
})
export class TablasBaseModule { }
