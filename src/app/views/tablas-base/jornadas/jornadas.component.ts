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

  public jornadas: any;
  public carreras: any;
  constructor(private _jornadaService: JornadasService, private _carrerasService: CarrerasService) { }

  ngOnInit() {
    this._jornadaService.listJornadas().subscribe(res => { this.jornadas = res; });
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
        'Carrera: <select id="za_carrera" placeholder="Carrera" class="swal2-select">' +
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
      this._jornadaService.crearJornada(res.value).subscribe(() => {
        this._jornadaService.listJornadas().subscribe(resp => { this.jornadas = resp; });
      });
    });
  }

  editar(index) {
    let options = '';
    for (const key in this.jornadas) {
      if (this.carreras.hasOwnProperty(key)) {
        const carrera = this.carreras[key];
        options = options + '<option value="' + carrera.za_carrera + '"> ' + carrera.nombre_carrera + '</option>';
      }
    }
    Swal.fire({
      title: 'Editar Jornada',
      html:
        '<form id="modal-form">' +
        '<select id="za_carrera" placeholder="Carrera" class="swal2-select">' +
        options +
        '</select>' +
        '<input id="nombre_jornada"  placeholder="Nombre" class="swal2-input">' +
        `<input type="checkbox" id="activo"  placeholder="Activo" class="swal2-checkbox" ` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_jornada: this.jornadas[index].za_jornada,
          za_carrera: $('#za_carrera').val(),
          nombre_jornada:  $('#nombre_jornada').val(),
          activo: $('#activo')[0].checked ? 1 : 0,
          accion: 1
        };
      },
    }).then(res => {
      this._jornadaService.crearJornada(res.value).subscribe(() => {
        this._jornadaService.listJornadas().subscribe(resp => { this.jornadas = resp; });
      });
    });
  }

  eliminar(index) {
    const request = {...this.jornadas[index], accion: 2};
    request.activo = request.activo.data;
    this._jornadaService.crearJornada(request).subscribe();
  }
}
