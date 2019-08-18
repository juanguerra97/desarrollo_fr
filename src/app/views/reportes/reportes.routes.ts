import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PlanificacionComponent} from './planificacion/planificacion.component';
import {CatedraticosComponent} from './catedraticos/catedraticos.component';

export const REPORTES_ROUTES: Routes = [
  {
    path: 'planificacion',
    data: {
      title: 'Planificacion'
    },
    component: PlanificacionComponent
  },
  {
    path: 'catedraticos',
    data: {
      title: 'Catedratico'
    },
    component: CatedraticosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(REPORTES_ROUTES)],
  exports: [RouterModule]
})
export class ReportesRoutes {}
