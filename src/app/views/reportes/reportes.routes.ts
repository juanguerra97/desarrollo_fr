import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PlanificacionComponent} from './planificacion/planificacion.component';

export const REPORTES_ROUTES: Routes = [
  {
    path: 'planificacion',
    data: {
      title: 'Planificacion'
    },
    component: PlanificacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(REPORTES_ROUTES)],
  exports: [RouterModule]
})
export class ReportesRoutes {}
