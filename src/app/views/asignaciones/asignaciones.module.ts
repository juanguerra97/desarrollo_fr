import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AsignacionesRoutes} from './asignaciones.routes';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ AsignacionesComponent],
  imports: [
    CommonModule,
    AsignacionesRoutes,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class AsignacionesModule { }
