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

  private cursos:ICurso[];
  private cursoSeleccionado:ICurso=null;

  constructor(
    private cursosService:CursosService,
    private modalConfirmacion:ModalConfirmacionService
  ) { 
    this.cursos = this.cursosService.getAll();
  }

  ngOnInit() {
    
  }

  onCambioCursoSeleccionado(curso:ICurso){
    this.cursoSeleccionado = curso;
  }

  onNuevoCurso(nuevoCurso:ICurso){
    // this.cursosService.insert(nuevoCurso);
    this.cursos.push(nuevoCurso);
    
  }

  onUpdateCurso(cursoActualizado:ICurso){
    // this.cursosService.update(this.cursoSeleccionado,cursoActualizado);
    this.cursoSeleccionado.nombre = cursoActualizado.nombre;
  }

  onBorrarCurso():void{
    if(this.cursoSeleccionado == null) return;

    this.modalConfirmacion.mostrar(
      'Confirmar',
      "¿Seguro quiere eliminar el curso '" + this.cursoSeleccionado.nombre + "'?",
      'Confirmar',
      'Cancelar',
      'lg'
    ).then((confirmacion)=>{
      if(confirmacion == true){
        // this.cursosService.delete(this.cursoSeleccionado);
        let index = this.cursos.findIndex(curso=>curso.codigo==this.cursoSeleccionado.codigo);
        this.cursos.splice(index,1);
        this.cursoSeleccionado = null;
      }
    }).catch(()=>{});

  }

}
