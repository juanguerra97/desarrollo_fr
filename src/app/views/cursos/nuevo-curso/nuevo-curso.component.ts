import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ICurso } from '../../../models/icurso.model';

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

  constructor() { }

  ngOnInit() {

  }

  onSubmit(){
    this.oninsert.emit(this.formCurso.value);
    this.formCurso.reset();
  }

}
