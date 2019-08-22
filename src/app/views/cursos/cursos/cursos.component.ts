import { Component, OnInit } from '@angular/core';



import { CursosService } from '../../../services/cursos.service';
import { ICurso } from '../../../models/icurso.model';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  private cursos:ICurso[];
  private cursoSeleccionado:ICurso=null;

  constructor(
    private cursosService:CursosService
  ) { 
    this.cursos = this.cursosService.getAll();
  }

  ngOnInit() {
    
  }

  onCambioCursoSeleccionado(curso:ICurso){
    this.cursoSeleccionado = curso;
  }

  onNuevoCurso(nuevoCurso:ICurso){
    this.cursos.push(nuevoCurso);
    
  }

  onBorrarCurso(curso:ICurso){
    let indexCurso = this.cursos.findIndex(c=>c.codigo === curso.codigo);
    this.cursos.splice(indexCurso,1);
  }

}
