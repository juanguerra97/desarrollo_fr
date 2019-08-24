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

  private cursos: [];
  private cursoSeleccionado: null;

  constructor(
    private cursosService: CursosService,
    private modalConfirmacion: ModalConfirmacionService
  ) {
  }

  ngOnInit() {
  }

  onCambioCursoSeleccionado(curso) {
    this.cursoSeleccionado = curso;
  }

  onNuevoCurso(nuevoCurso) {
    // this.cursosService.insert(nuevoCurso);
  }

  onUpdateCurso(cursoActualizado) {
    // this.cursosService.update(this.cursoSeleccionado,cursoActualizado);
  }

  onBorrarCurso() {
  }

}
