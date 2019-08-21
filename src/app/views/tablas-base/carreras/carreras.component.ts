import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {CarrerasService} from '../../../../services/carreras.service';

declare var $: any;

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {
  constructor(private _carreraService: CarrerasService) {
  }

  ngOnInit() {
  }

  openModal(id: string) {
    Swal.fire({
      title: 'Nueva Carrera',
      html:
        '<form id="modal-form">' +
          '<input id="codigo_carrera" placeholder="Codigo" class="swal2-input" >' +
          '<input id="nombre_carrera"  placeholder="Nombre" class="swal2-input">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          codigo_carrera: $('#codigo_carrera').val(),
          nombre_carrera:  $('#nombre_carrera').val()

        };
      },
    }).then(res => {
      this._carreraService.crearCarrera(res.value);
    });
  }
}
