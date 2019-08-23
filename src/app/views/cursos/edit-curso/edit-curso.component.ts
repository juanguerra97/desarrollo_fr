import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICurso } from '../../../models/icurso.model';
import { CursosService } from '../../../services/cursos.service';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.scss']
})
export class EditCursoComponent implements OnInit {

  @Input('curso') curso:ICurso;
  @Output('onupdate') onupdatecurso = new EventEmitter<ICurso>();

  private formActualizarCurso = new FormGroup({
    nombre: new FormControl('',[
      Validators.required
    ])
  });

  constructor(
    private cursosService: CursosService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }

  openModal(content) {
    this.formActualizarCurso.setValue({nombre:this.curso.nombre});
    this.modalService.open(content, {
      ariaLabelledBy: 'update-curso-title',
      centered: true,
      size: "lg",
      windowClass:"animated bounceIn"
    });
  }

  onSubmit(modal:any){
    modal.close('');
    
    if(this.formActualizarCurso.value.nombre != this.curso.nombre){
      this.onupdatecurso.emit({
        codigo: this.curso.codigo,
        nombre:this.formActualizarCurso.value.nombre
      });
    }
    

    this.formActualizarCurso.reset();
    
  }

}
