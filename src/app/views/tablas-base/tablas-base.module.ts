import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumsComponent } from './pensums/pensums.component';
import {TablasBaseRoutes} from './tablas_base.routes';
import { CarrerasComponent } from './carreras/carreras.component';
import { NuevaCarreraComponent } from './carreras/nueva-carrera/nueva-carrera.component';
import {AppCommonModule} from '../app-common/app-common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JornadasComponent } from './jornadas/jornadas.component';
import { DiasJornadaComponent } from './dias-jornada/dias-jornada.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PensumsComponent, CarrerasComponent, NuevaCarreraComponent, JornadasComponent, DiasJornadaComponent],
  imports: [
    CommonModule,
    TablasBaseRoutes,
    AppCommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
entryComponents: [NuevaCarreraComponent]
})
export class TablasBaseModule { }
