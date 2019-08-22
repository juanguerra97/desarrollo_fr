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
  @Output('onselectionchange') onselection = new EventEmitter<ICurso>();

  private selected: ICurso = {codigo:-1,nombre:""};

  constructor() { }

  ngOnInit() {
    
  }

  private onBorrarCurso(curso:ICurso){
    this.ondelete.emit(curso);
  }

  private onCursoClicked(curso:ICurso){
    // no hay curso seleccionado o seleccion nueva
    if(this.selected.codigo == -1 || this.selected.codigo != curso.codigo){
      this.selected = curso;
      this.onselection.emit(this.selected);
    }else{// deseleccion del curso seleccionado anteriormente
      this.selected = {codigo:-1,nombre:""};
      this.onselection.emit(null);
    }

    
  }

}
