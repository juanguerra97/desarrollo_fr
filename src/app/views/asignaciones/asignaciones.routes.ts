import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// import {ListaComponent} from './lista/lista.component';
// import {NuevoComponent} from './nuevo/nuevo.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';

export const ASIGNACIONES_ROUTES: Routes = [
  {
    path: '',
    data: {
      title: 'Asignaciones'
    },
    component: AsignacionesComponent
  },
  // {
  //   path: 'nuevo',
  //   data: {
  //     title: 'Nuevo'
  //   },
  //   component: NuevoComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(ASIGNACIONES_ROUTES)],
  exports: [RouterModule]
})
export class AsignacionesRoutes {}
