import { Component, OnInit } from '@angular/core';
import {IAsignacion} from '../../../models/iasignacion.model';
import {ISeccion} from '../../../models/iseccion.model';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {

  private filtro:ISeccion=null;
  private asignaciones:IAsignacion[]=[];
  private asignacionSeleccionada = null;

  constructor() { }

  ngOnInit() {
  }

  onChangeSelectedAsig(asignacion:IAsignacion){
    this.asignacionSeleccionada = asignacion;
  }

}
