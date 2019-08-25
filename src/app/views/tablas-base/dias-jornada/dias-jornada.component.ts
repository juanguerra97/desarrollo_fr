import { Component, OnInit } from '@angular/core';
import {CarrerasService} from '../../../../services/carreras.service';
import Swal from 'sweetalert2';
import {DiasJornadaService} from '../../../services/dias-jornada.service';
import {JornadasService} from '../../../services/jornadas.service';
declare var $: any;

@Component({
  selector: 'app-dias-jornada',
  templateUrl: './dias-jornada.component.html',
  styleUrls: ['./dias-jornada.component.scss']
})
export class DiasJornadaComponent implements OnInit {
  public dias: any;
  public carreras: any;
  public jornadas: any;
  public carrera: any;
  public jornada: any;
  constructor(private _diaService: DiasJornadaService, private _carrerasService: CarrerasService,
              private _jornadasService: JornadasService) { }

  ngOnInit() {
    this._carrerasService.listCarreras().subscribe(res => { this.carreras = res; });
  }
  // nuevo modelo
  openModal(id: string) {
    let optionsJornada = '';
    for (const key in this.jornadas) {
      if (this.jornadas.hasOwnProperty(key)) {
        const jornada = this.jornadas[key];
        optionsJornada = optionsJornada + '<option value="' + jornada.za_jornada + '"> ' + jornada.nombre_jornada + '</option>';
      }
    }
    Swal.fire({
      title: 'Nueva Dia',
      html:
        '<form id="modal-form">' +
        'Carrera: <input disabled id="za_carrera" placeholder="Carrera" value="' +
        (this.carrera || 'seleccione carrera en el menu principal') + '" class="swal2-input">' +
        '</input>' +
        'Jornada: <select id="za_jornada" placeholder="Jornada" class="swal2-select">' +
        optionsJornada +
        '</select>' +
        '<input id="nombre_jornada"  placeholder="Dia" class="swal2-input">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_dia: 0,
          activo: true,
          za_jornada: $('#za_jornada').val(),
          za_carrera: $('#za_carrera').val(),
          nombre_jornada:  $('#nombre_jornada').val(),
          accion: 1
        };
      },
    }).then(res => {
      this._diaService.crearDia(res.value).subscribe(() => {location.reload();
      }, error => () => { location.reload();
      });
    });
  }

  editar(index) {
    const dia = this.dias[index];
    let optionsJornada = '';
    for (const key in this.jornadas) {
      if (this.jornadas.hasOwnProperty(key)) {
        const jornada = this.jornadas[key];
        if (dia.za_jornada === jornada.za_jornada) {
          optionsJornada = optionsJornada + '<option value="' + jornada.za_jornada + '" selected> ' + jornada.nombre_jornada + '</option>';
        } else {
          optionsJornada = optionsJornada + '<option value="' + jornada.za_jornada + '"> ' + jornada.nombre_jornada + '</option>';
        }
      }
    }
    Swal.fire({
      title: 'Editar Dia',
      html:
        '<form id="modal-form">' +
        'Carrera: <input disabled id="za_carrera" placeholder="Carrera" value="' +
        this.carrera + '" class="swal2-input">' +
        '</input>' +
        'Jornada: <select id="za_jornada" placeholder="Jornada" class="swal2-select">' +
        optionsJornada +
        '</select>' +
        '<input id="dia"  placeholder="Dia" class="swal2-input" value="' + dia.dia + '">' +
        `<input type="checkbox" id="activo"  placeholder="Activo" class="swal2-checkbox" ` +
        `${(dia.activo.data[0] === 1) ? 'checked' : ''}> activo` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_dia: this.dias[index].za_dia,
          za_carrera: $('#za_carrera').val(),
          za_jornada: $('#za_jornada').val(),
          dia:  $('#dia').val(),
          activo: $('#activo')[0].checked ? 1 : 0,
          accion: 1
        };
      },
    }).then(res => {
      this._diaService.crearDia(res.value).subscribe(() => {
        this.buscar();
      });
    });
  }

  eliminar(index) {
    const request = {...this.dias[index], accion: 2};
    request.activo = request.activo.data;
    this._diaService.crearDia(request).subscribe(() => this.buscar());
  }
  buscarCarrera() {
    if (this.carrera) {
      this._jornadasService.listJornadas(this.carrera).subscribe(res => { this.jornadas = res; });
    }
  }
  buscar() {
    if (this.jornada) {
      this._diaService.listDias(this.carrera, this.jornada).subscribe(res => { this.dias = res; });
    }
  }
}
