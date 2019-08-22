import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICurso } from '../../../models/icurso.model';

declare var $: any;

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.scss']
})
export class NuevoCursoComponent implements OnInit {

  @Output('oninsert') oninsert = new EventEmitter<ICurso>();

  formCurso = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
  });

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  showNewCurso(){
    // $('#new-curso-modal').modal('show');
  }

  openModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: "lg",
      windowClass:"animated bounceIn"
    });
    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  onSubmit(modal:any){
    modal.close('');

    this.oninsert.emit(this.formCurso.value);
    this.formCurso.reset();

    // Swal.fire('Se ingresó un nuevo curso');
    
  }

}
