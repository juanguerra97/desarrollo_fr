import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {IAsignacion} from '../../../models/iasignacion.model';
import {ISeccion} from '../../../models/iseccion.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalConfirmacionService} from '../../../services/modal-confirmacion.service';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {

  private filtro:ISeccion=null; // seccion a la que deberán pertenecer las asignaciones
  private asignaciones:IAsignacion[]=[];
  private asignacionSeleccionada = null;// asignacion seleccionada en la lista, con un click se selecciona y volviendo a hacer click se deselecciona

  // formulario para editar o ingresar una nueva asignacion
  private formAsignacion = new FormGroup({
    za_curso: new FormControl('0',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    za_profesor: new FormControl('0',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    za_dia: new FormControl('0',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    hora_inicio: new FormControl('',[
      Validators.required, Validators.pattern('([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9]))?')
    ]),
    hora_fin: new FormControl('',[
      Validators.required, Validators.pattern('([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9]))?')
    ]),
  });

  constructor(private modalService: NgbModal, private modalConfirmacion:ModalConfirmacionService) { }

  ngOnInit() {
  }

  guardarNueva(){
    let nuevaAsignacion = {
      za_carrera: this.filtro.za_carrera,
      ano_pensum: this.filtro.ano_pensum,
      za_jornada: this.filtro.za_jornada,
      ano: this.filtro.ano,
      no_semestre: this.filtro.no_semestre,
      seccion: this.filtro.seccion,
      za_curso: this.formAsignacion.value.za_curso,
      za_profesor: this.formAsignacion.value.za_profesor,
      za_dia: this.formAsignacion.value.za_dia,
      hora_inicio: this.formAsignacion.value.hora_inicio,
      hora_fin: this.formAsignacion.value.hora_fin,
    };
    // TODO: guardar la nueva asignacion en el servidor

    this.formAsignacion.reset();
  }

  guardarEdicion(){
    let nuevaAsignacion = {
      za_carrera: this.filtro.za_carrera,
      ano_pensum: this.filtro.ano_pensum,
      za_jornada: this.filtro.za_jornada,
      ano: this.filtro.ano,
      no_semestre: this.filtro.no_semestre,
      seccion: this.filtro.seccion,
      za_curso: this.formAsignacion.value.za_curso,
      za_profesor: this.formAsignacion.value.za_profesor,
      za_dia: this.formAsignacion.value.za_dia,
      hora_inicio: this.formAsignacion.value.hora_inicio,
      hora_fin: this.formAsignacion.value.hora_fin,
    };
    // TODO: guardar la actualizacion de la asignacion en el servidor
  }

  // muestra modal para pedir confirmacion de la asignacion seleccionadagit
  eliminar(){
    this.modalConfirmacion.mostrar(
      'Eliminar Asignacion',
      '¿Está seguro que quiere eliminar la asignacion?')
      .then(result => {
        if(result ==  true){
          // TODO: Eliminar la asignacion seleccionada
        }else {
          // TODO: Se cancela la eliminación
        }})
      .catch(dismiss=>console.log(dismiss));
  }

  // metodo que se ejecuta cada vez que se selecciona o deselecciona una asignacion de la lista
  onChangeSelectedAsig(asignacion:IAsignacion){
    this.asignacionSeleccionada = asignacion;
  }

  // abre el modal par editar o ingresar nueva asignacion
  openModal(content) {
    if(this.asignacionSeleccionada != null){ // se quiere editar una asignación

      // se cargan los valores de la asignacion seleccionada en el formulario
      this.formAsignacion.value.za_curso = this.asignacionSeleccionada.curso.za_curso;
      this.formAsignacion.value.za_profesor = this.asignacionSeleccionada.catedratico.za_profesor;
      this.formAsignacion.value.za_dia = this.asignacionSeleccionada.dia.za_dia;
      this.formAsignacion.value.hora_inicio = this.asignacionSeleccionada.hora_inicio;
      this.formAsignacion.value.hora_fin = this.asignacionSeleccionada.hora_fino;

    }

    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });

  }

}
