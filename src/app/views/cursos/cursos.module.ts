import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { CursosComponent } from './cursos/cursos.component';
import { CursosRoutes } from './cursos.routes';

@NgModule({
  declarations: [
    CursosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    CursosRoutes,
    FormsModule
  ]
})
export class CursosModule { }
