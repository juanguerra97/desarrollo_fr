import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { CursosComponent } from './cursos/cursos.component';
import { CursosRoutes } from './cursos.routes';
import { ListacursosComponent } from './listacursos/listacursos.component';
import { NuevoCursoComponent } from './nuevo-curso/nuevo-curso.component';
import { EditCursoComponent } from './edit-curso/edit-curso.component'


@NgModule({
  declarations: [
    CursosComponent,
    ListacursosComponent,
    NuevoCursoComponent,
    EditCursoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    CursosRoutes
  ]
})
export class CursosModule { }
