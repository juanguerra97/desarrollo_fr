import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import {AsignacionesRoutes} from './asignaciones.routes';



@NgModule({
  declarations: [ListaComponent, NuevoComponent],
  imports: [
    CommonModule,
    AsignacionesRoutes
  ]
})
export class AsignacionesModule { }
