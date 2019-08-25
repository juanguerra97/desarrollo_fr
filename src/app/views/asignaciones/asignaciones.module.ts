import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import {AsignacionesRoutes} from './asignaciones.routes';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { FiltroAsigComponent } from './filtro-asig/filtro-asig.component';
import { ReactiveFormsModule } from '@angular/forms'



@NgModule({
  declarations: [ListaComponent, NuevoComponent, AsignacionesComponent, FiltroAsigComponent],
  imports: [
    CommonModule,
    AsignacionesRoutes,
    ReactiveFormsModule
  ]
})
export class AsignacionesModule { }
