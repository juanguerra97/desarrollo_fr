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

  public carreras: any;
  constructor(private _jornadaService: JornadasService, private _carrerasService: CarrerasService) { }

  ngOnInit() {
    this._carrerasService.listCarreras().subscribe(res => { this.carreras = res; });
  }
  // nuevo modelo
  openModal(id: string) {
    let options = '';
    for (const key in this.carreras) {
      if (this.carreras.hasOwnProperty(key)) {
        const carrera = this.carreras[key];
        options = options + '<option value="' + carrera.za_carrera + '"> ' + carrera.nombre_carrera + '</option>';
      }
    }
    Swal.fire({
      title: 'Nueva Jornada',
      html:
        '<form id="modal-form">' +
        '<select id="za_carrera" placeholder="Carrera" class="swal2-select">' +
          options +
        '</select>' +
        '<input id="nombre_jornada"  placeholder="Nombre" class="swal2-input">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_jornada: 0,
          activo: true,
          za_carrera: $('#za_carrera').val(),
          nombre_jornada:  $('#nombre_jornada').val(),
          accion: 1
        };
      },
    }).then(res => {
      this._jornadaService.crearJornada(res.value);
    });
  }
}
