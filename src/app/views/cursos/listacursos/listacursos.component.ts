import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICurso } from '../../../models/icurso.model';

@Component({
  selector: 'app-listacursos',
  templateUrl: './listacursos.component.html',
  styleUrls: ['./listacursos.component.scss']
})
export class ListacursosComponent implements OnInit {

  @Input() cursos: any;
  @Output('ondeletecurso') ondelete = new EventEmitter<ICurso>();
  @Output('onselectionchange') onselection = new EventEmitter<ICurso>();

  constructor() { }

  ngOnInit() {

  }

  private onBorrarCurso() {
  }

  private onCursoClicked(curso){
    // no hay curso seleccionado o seleccion nueva
  }

}
