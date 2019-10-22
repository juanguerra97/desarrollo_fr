import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {CarrerasService} from '../../../../services/carreras.service';
import {JornadasService} from '../../../services/jornadas.service';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {ICarrera} from '../../../models/icarrera.model';
import {IJornada} from '../../../models/ijornada';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.scss']
})
export class JornadasComponent implements OnInit {

  public jornadas: IJornada[] = [];
  public carreras: ICarrera[] = [];
  public za_carrera: number = null;

  constructor(
    private _jornadaService: JornadasService,
    private _carrerasService: CarrerasService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    // se cargan las carreras
    this._carrerasService.listCarreras()
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.carreras = res.data;
        } else {
          this.toastr.error(res.error, res.message);
          console.error(res);
        }
      }, error => console.error(error));

  }
  // nuevo modelo
  openModal(id: string) {
    /*let options = '';
    for (const key in this.carreras) {
      if (this.carreras.hasOwnProperty(key)) {
        const carrera = this.carreras[key];
        options = options + '<option value="' + carrera.za_carrera + '"> ' + carrera.nombre_carrera + '</option>';
      }
    }*/
    Swal.fire({
      title: 'Nueva Jornada',
      html:
        '<form id="modal-form">' +
        /*'Carrera: <select id="za_carrera" placeholder="Carrera" class="swal2-select">' +
          options +
        '</select>' +*/
        '<input id="nombre_jornada"  placeholder="Nombre" class="swal2-input">' +
        `<input type="checkbox" id="activo"  placeholder="Activo" checked class="swal2-checkbox">Activo` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_jornada: 0,
          activo: $('#activo').val() ? 1 : 0,
          za_carrera: this.za_carrera,
          nombre_jornada:  $('#nombre_jornada').val()
        };
      },
    }).then(res => {
      if(res.value){
        this._jornadaService.crearJornada(res.value)
          .subscribe((res:IServerResponse) => {
            if(res.status == 200){
              this.cargarJornadas();
            } else {
              this.toastr.error(res.error, res.message);
              console.error(res);
            }
          }, error => console.error(error));
      }

    });
  }

  editar(index) {
    const jorn = this.jornadas[index];
    /*let options = '';
    for (const key in this.carreras) {
      if (this.carreras.hasOwnProperty(key)) {
        const carrera = this.carreras[key];
        if (jorn.za_carrera === carrera.za_carrera) {
          options = options + '<option value="' + carrera.za_carrera + '" selected> ' + carrera.nombre_carrera + '</option>';
        } else {
          options = options + '<option value="' + carrera.za_carrera + '"> ' + carrera.nombre_carrera + '</option>';
        }
      }
    }*/
    Swal.fire({
      title: 'Editar Jornada',
      html:
        '<form id="modal-form">' +
        /*'jornada <select id="za_carrera" placeholder="Jornada" class="swal2-select">' +
        options +*/
        '</select>' +
        '<input title="nombre" id="nombre_jornada"  placeholder="Nombre" class="swal2-input" value="' + jorn.nombre_jornada + '">' +
        `<input type="checkbox" id="activo" class="swal2-checkbox" ${(jorn.activo === 1) ? 'checked' : ''}> Activo` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_jornada: this.jornadas[index].za_jornada,
          za_carrera: jorn.za_carrera,
          nombre_jornada:  $('#nombre_jornada').val(),
          activo: $('#activo')[0].checked ? 1 : 0,
        };
      },
    }).then(res => {
      if(res.value){
        this._jornadaService.editarJornada(res.value.za_carrera,res.value.za_jornada,res.value)
          .subscribe((res:IServerResponse) => {
          if(res.status == 200){
            this.cargarJornadas();
          } else {
            this.toastr.error(res.error, res.message);
            console.error(res);
          }
        }, error => console.error(error));
      }

    });
  }

  eliminar(index) {

    Swal.fire({
      title: 'Estas a punto de eliminar una jornada',
      text: "La eliminacion no se puede revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        const jornada = this.jornadas[index];
        this._jornadaService.eliminarJornada(jornada.za_carrera,jornada.za_jornada)
          .subscribe((res:IServerResponse) => {
            if(res.status == 200){
              this.cargarJornadas();
            } else {
              this.toastr.error(res.error, res.message);
              console.error(res);
            }
          }, error => console.error(error))

      }

    });

  }

  public cargarJornadas() {
    if (this.za_carrera) {
      this._jornadaService.listJornadas(this.za_carrera)
        .subscribe((res:IServerResponse)=>{
          if(res.status == 200){
            this.jornadas = res.data;
          } else {
            this.toastr.error(res.error, res.message);
            console.error(res);
          }
        }, error => console.error(error));
    } else {
      this.jornadas = [];
    }
  }

}
