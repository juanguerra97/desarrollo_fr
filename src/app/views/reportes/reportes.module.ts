import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportesRoutes} from './reportes.routes';
import { PlanificacionComponent } from './planificacion/planificacion.component';



@NgModule({
  declarations: [PlanificacionComponent],
  imports: [
    CommonModule,
    ReportesRoutes,
  ]
})
export class ReportesModule { }
