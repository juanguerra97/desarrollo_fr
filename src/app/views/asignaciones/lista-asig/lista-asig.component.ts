import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


import { ISeccion } from '../../../models/iseccion.model';
import { IAsignacion } from '../../../models/iasignacion.model';

@Component({
  selector: 'app-lista-asig',
  templateUrl: './lista-asig.component.html',
  styleUrls: ['./lista-asig.component.scss']
})
export class ListaAsigComponent implements OnInit {

  @Input('filtro') filtro:ISeccion;
  @Input('asignaciones') asignaciones: IAsignacion[];
  @Output('onchangeselection') onchangeselection = new EventEmitter<IAsignacion>();

  private selected:IAsignacion=null;

  constructor() { }

  ngOnInit() {

  }

  onAsignacionClicked(asignacion:IAsignacion){
    if(asignacion == this.selected){
      this.selected = null;
    }else{
      this.selected = asignacion;
    }
    this.onchangeselection.emit(this.selected);
  }

}
