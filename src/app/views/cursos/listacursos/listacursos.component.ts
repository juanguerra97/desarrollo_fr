import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICurso } from '../../../models/icurso.model';

@Component({
  selector: 'app-listacursos',
  templateUrl: './listacursos.component.html',
  styleUrls: ['./listacursos.component.scss']
})
export class ListacursosComponent implements OnInit {

  @Input() cursos:ICurso[];
  @Output('ondeletecurso') ondelete = new EventEmitter<ICurso>();

  constructor() { }

  ngOnInit() {
    
  }

  private onBorrarCurso(curso:ICurso){
    this.ondelete.emit(curso);
  }

}
