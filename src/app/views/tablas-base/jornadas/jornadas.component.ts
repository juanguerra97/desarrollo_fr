import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {CarrerasService} from '../../../../services/carreras.service';
import {JornadasService} from '../../../services/jornadas.service';
declare var $: any;
@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.scss']
})
export class JornadasComponent implements OnInit {

  constructor(private _jornadaService: JornadasService) { }

  ngOnInit() {
  }
  openModal(id: string) {
    Swal.fire({
      title: 'Nueva Jornada',
      html:
        '<form id="modal-form">' +
        '<select id="za_carrera" placeholder="Carrera" class="swal2-select">' +
          '<option>Uno</option>' +
          '<option>Dos</option>' +
        '</select>' +
        '<input id="nombre_jornada"  placeholder="Nombre" class="swal2-input">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_carrera: $('#za_carrera').val(),
          nombre_jornada:  $('#nombre_jornada').val()
        };
      },
    }).then(res => {
      this._jornadaService.crearJornada(res.value);
    });
  }
}
