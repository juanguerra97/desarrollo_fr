import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportesRoutes} from './reportes.routes';
import { PlanificacionComponent } from './planificacion/planificacion.component';
import { CatedraticosComponent } from './catedraticos/catedraticos.component';
import { CursosComponent } from './cursos/cursos.component';



@NgModule({
  declarations: [PlanificacionComponent, CatedraticosComponent, CursosComponent],
  imports: [
    CommonModule,
    ReportesRoutes,
  ]
})
export class ReportesModule { }
