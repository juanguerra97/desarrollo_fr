import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumsComponent } from './pensums/pensums.component';
import {TablasBaseRoutes} from './tablas_base.routes';
import { CarrerasComponent } from './carreras/carreras.component';
import { NuevaCarreraComponent } from './carreras/nueva-carrera/nueva-carrera.component';
import {AppCommonModule} from '../app-common/app-common.module';
import {FormsModule} from '@angular/forms';
import { JornadasComponent } from './jornadas/jornadas.component';


@NgModule({
  declarations: [PensumsComponent, CarrerasComponent, NuevaCarreraComponent, JornadasComponent],
  imports: [
    CommonModule,
    TablasBaseRoutes,
    AppCommonModule,
    FormsModule
  ],
entryComponents: [NuevaCarreraComponent]
})
export class TablasBaseModule { }
