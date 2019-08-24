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
  public carreras: any;

  constructor(private _carreraService: CarrerasService) {
  }

  ngOnInit() {
    this._carreraService.listCarreras().subscribe(res => { this.carreras = res; });
  }

  editar(index) {
    const carrera = this.carreras[index];
    Swal.fire({
      title: 'Editar Carrera',
      html:
        '<form id="modal-form">' +
        `<input id="codigo_carrera" placeholder="Codigo" class="swal2-input" value="${carrera.codigo_carrera}">` +
        `<input id="nombre_carrera"  placeholder="Nombre" class="swal2-input" value="${carrera.nombre_carrera}">` +
        `<input type="checkbox" id="activo"  placeholder="Activo" class="swal2-checkbox" ` +
        `${(carrera.activo.data[0] === 1) ? 'checked' : ''}>` +
        `Activo` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_carrera: this.carreras[index].za_carrera,
          codigo_carrera: $('#codigo_carrera').val(),
          nombre_carrera:  $('#nombre_carrera').val(),
          activo: $('#activo')[0].checked ? 1 : 0,
          accion: 1
        };
      },
    }).then(res => {
      this._carreraService.crearCarrera(res.value).subscribe(() => {
        this._carreraService.listCarreras().subscribe(respuesta => { this.carreras = respuesta; });
      });
    });
  }

  eliminar(index) {
    const request = {...this.carreras[index], accion: 2};
    request.activo = request.activo.data;
    this._carreraService.crearCarrera(request).subscribe(() =>
      this._carreraService.listCarreras().subscribe(res => { this.carreras = res; }));
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
          za_carrera: 0,
          codigo_carrera: $('#codigo_carrera').val(),
          nombre_carrera:  $('#nombre_carrera').val(),
          activo: true,
          accion: 1

        };
      },
    }).then(res => {
      this._carreraService.crearCarrera(res.value).subscribe(
        () => {
          this._carreraService.listCarreras().subscribe(respuesta => { this.carreras = respuesta; });
        }
      );
    });
  }
}
