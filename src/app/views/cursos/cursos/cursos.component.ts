import { Component, OnInit } from '@angular/core';



import { CursosService } from '../../../services/cursos.service';
import { ICurso } from '../../../models/icurso.model';

import { ModalConfirmacionService } from '../../../services/modal-confirmacion.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  private cursos: any;
  private cursoSeleccionado: null;

  constructor(
    private _cursoService: CursosService
  ) {
  }

  ngOnInit() {
    this._cursoService.listCursos().subscribe((res) => this.cursos = res);
  }

  onCambioCursoSeleccionado(curso) {
    this.cursoSeleccionado = curso;
  }

  onNuevoCurso(nuevoCurso) {
    this._cursoService.listCursos().subscribe((res) => this.cursos = res);
  }


  onUpdateCurso(){

  };
}
