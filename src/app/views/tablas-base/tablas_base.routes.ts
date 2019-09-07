import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PensumsComponent} from './pensums/pensums.component';
import {CarrerasComponent} from './carreras/carreras.component';
import {JornadasComponent} from './jornadas/jornadas.component';
import {DiasJornadaComponent} from './dias-jornada/dias-jornada.component';
import {PensumCursoComponent} from './pensum-curso/pensum-curso.component';
import {CatedraticosComponent} from './catedraticos/catedraticos.component';

export const TABLAS_BASES_ROUTES: Routes = [
  {
    path: 'pensum',
    data: {
      title: 'Pensum'
    },
    component: PensumsComponent
  },
  {
    path: 'carreras',
    data: {
      title: 'Carreras'
    },
    component: CarrerasComponent
  },
  {
    path: 'jornadas',
    data: {
      title: 'Jornadas'
    },
    component: JornadasComponent
  },
  {
    path: 'dias-jornada',
    data: {
      title: 'Dias'
    },
    component: DiasJornadaComponent
  },
  {
    path: 'pensum_curso',
    data: {
      title: 'Pensum Curso'
    },
    component: PensumCursoComponent
  },
  {
    path: 'catedraticos',
    data: {
      title: 'Catedraticos'
    },
    component: CatedraticosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(TABLAS_BASES_ROUTES)],
  exports: [RouterModule]
})
export class TablasBaseRoutes {}
