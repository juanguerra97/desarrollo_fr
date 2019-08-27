import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISeccion } from '../../../models/iseccion.model';

@Component({
  selector: 'app-filtro-asig',
  templateUrl: './filtro-asig.component.html',
  styleUrls: ['./filtro-asig.component.scss']
})
export class FiltroAsigComponent implements OnInit {

  @Output('onfiltrar') onfiltrar = new EventEmitter<ISeccion>();

  // formulario para la seccion a filtrar
  public formFiltro = new FormGroup({
    za_carrera: new FormControl('-1',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    ano_pensum: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    ano: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    no_semestre: new FormControl('1',[
      Validators.required,
      Validators.pattern('[12]')
    ]),
    za_jornada: new FormControl('-1',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    seccion: new FormControl('',[
      Validators.required,
      Validators.pattern('[A-Z]')
    ])
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    this.onfiltrar.emit(this.formFiltro.value);
  }

}
