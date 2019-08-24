import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CursosService } from '../../../services/cursos.service';

declare var $: any;
@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.scss']
})

export class EditCursoComponent implements OnInit {

  public _curso: any;
  @Output() onupdatecurso = new EventEmitter<boolean>();

  @Input()
  set curso(curso: any) {
    if (curso) {
      this._curso = curso;
      $('#modal-open').trigger('click');
    }
  }


  private formActualizarCurso = new FormGroup({
    nombre: new FormControl('', [
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
    this.modalService.open(content, {
      ariaLabelledBy: 'update-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  onSubmit(modal: any) {
    modal.close('');
    this.formActualizarCurso.reset();
  }

}
