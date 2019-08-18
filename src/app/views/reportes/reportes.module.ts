import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportesRoutes} from './reportes.routes';
import { PlanificacionComponent } from './planificacion/planificacion.component';
import { CatedraticosComponent } from './catedraticos/catedraticos.component';



@NgModule({
  declarations: [PlanificacionComponent, CatedraticosComponent],
  imports: [
    CommonModule,
    ReportesRoutes,
  ]
})
export class ReportesModule { }
