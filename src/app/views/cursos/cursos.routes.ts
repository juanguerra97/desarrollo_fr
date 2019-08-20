import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CursosComponent} from './cursos/cursos.component';

export const CURSOS_ROUTES: Routes = [
  {
    path: '',
    data: {
      title: 'Cursos'
    },
    component: CursosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(CURSOS_ROUTES)],
  exports: [RouterModule]
})
export class CursosRoutes {}
