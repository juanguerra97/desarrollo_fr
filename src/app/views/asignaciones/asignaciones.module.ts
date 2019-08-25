import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import {AsignacionesRoutes} from './asignaciones.routes';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';



@NgModule({
  declarations: [ListaComponent, NuevoComponent, AsignacionesComponent],
  imports: [
    CommonModule,
    AsignacionesRoutes
  ]
})
export class AsignacionesModule { }
