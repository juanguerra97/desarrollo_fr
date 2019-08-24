import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CursosService} from '../../../services/cursos.service';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.scss']
})
export class NuevoCursoComponent implements OnInit {
  @Output() oninsert = new EventEmitter<boolean>();

  private formCurso = new FormGroup({
    za_curso: new FormControl(0, [
      Validators.required,
    ]),
    codigo: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    nombre: new FormControl('', [
      Validators.required
    ]),
    usa_laboratorio: new FormControl('', [
      Validators.required
    ]),
    activo: new FormControl('', [
      Validators.required
    ]),
    accion: new FormControl(1, [ Validators.required ])
  });
  public curso = null;

  constructor(private modalService: NgbModal, private _cursoService: CursosService) { }

  ngOnInit() {
  }

  showNewCurso() {
    // $('#new-curso-modal').modal('show');
  }

  openModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      windowClass: 'animated bounceIn'
    });
    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  onSubmit(modal: any) {
    modal.close('');
    this._cursoService.crearCurso(this.formCurso.value).subscribe(() => this.oninsert.emit(true));
    this.formCurso.reset();

    // Swal.fire('Se ingresó un nuevo curso');
  }

}
