import { Component, OnInit } from '@angular/core';
import {CarrerasService} from '../../../../services/carreras.service';
import Swal from 'sweetalert2';
import {DiasJornadaService} from '../../../services/dias-jornada.service';
import {JornadasService} from '../../../services/jornadas.service';
import {ICarrera} from '../../../models/icarrera.model';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {IJornada} from '../../../models/ijornada';
import {IDia} from '../../../models/idia.model';
declare var $: any;

@Component({
  selector: 'app-dias-jornada',
  templateUrl: './dias-jornada.component.html',
  styleUrls: ['./dias-jornada.component.scss']
})
export class DiasJornadaComponent implements OnInit {
  public dias: IDia[] = [];
  public carreras: ICarrera[] = [];
  public jornadas: IJornada[] = [];
  public za_carrera: number = null;
  public za_jornada: number = null;

  constructor(
    private _diaService: DiasJornadaService,
    private _carrerasService: CarrerasService,
    private _jornadasService: JornadasService
  ) { }

  ngOnInit() {

    // se cargan las carreras
    this._carrerasService.listCarreras()
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.carreras = res.data;
        } else {
          console.error(res);
        }
      }, error => console.error(error));

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
      title: 'Nuevo Dia',
      html:
        '<form id="modal-form">' +
        'Carrera: <input disabled id="za_carrera" placeholder="Carrera" value="' +
        (this.za_carrera || 'seleccione carrera en el menu principal') + '" class="swal2-input">' +
        '</input>' +
        '<div class="form-group">' +
        '<label for="za_jornada">Jornada</label>' +
        '<select id="za_jornada" placeholder="Jornada" class="custom-select custom-select-lg">' +
        optionsJornada +
        '</select>' +
        '</div>' +
        '<div class="form-group">' +
        //'<input id="nombre-dia"  placeholder="Dia" class="swal2-input">' +
        '<label for="nombre-dia">Dia:</label> '+
        '<select id="nombre-dia" class="custom-select custom-select-lg">' +
          '<option>LUNES</option>' +
          '<option>MARTES</option>' +
          '<option>MIERCOLES</option>' +
          '<option>JUEVES</option>' +
          '<option>VIERNES</option>' +
          '<option>SABADO</option>' +
          '<option>DOMINGO</option>' +
        '</select>' +
        '</div>' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_dia: 0,
          activo: 1,
          za_jornada: $('#za_jornada').val(),
          za_carrera: $('#za_carrera').val(),
          dia:  $('#nombre-dia').val()
        };
      },
    }).then(res => {

      if(res.value){
        this._diaService.crearDia(res.value)
          .subscribe((res:IServerResponse) => {
            if(res.status == 200){
              this.cargarDias()
            } else {
              console.error(res);
            }
          }, error => console.error(error));
      }

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
        this.za_carrera + '" class="swal2-input">' +
        '</input>' +
        'Jornada: <select id="za_jornada" placeholder="Jornada" class="swal2-select">' +
        optionsJornada +
        '</select>' +
        '<input id="dia"  placeholder="Dia" class="swal2-input" value="' + dia.dia + '">' +
        `<input type="checkbox" id="activo"  placeholder="Activo" class="swal2-checkbox" ` +
        `${(dia.activo === 1) ? 'checked' : ''}> activo` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_dia: this.dias[index].za_dia,
          za_carrera: $('#za_carrera').val(),
          za_jornada: $('#za_jornada').val(),
          dia:  $('#dia').val(),
          activo: $('#activo')[0].checked ? 1 : 0,
        };
      },
    }).then(res => {

      if(res.value){
        const dia = res.value;
        this._diaService.editarDia(dia.za_carrera,dia.za_jornada,dia.za_dia,dia)
          .subscribe((res:IServerResponse) => {
          if(res.status == 200){
            this.cargarDias();
          } else {
            console.error(res);
          }
        }, error => console.error(error));
      }

    });
  }

  eliminar(index) {

    Swal.fire({
      title: 'Estas a punto de eliminar un dia',
      text: "La eliminacion no se puede revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {

        const dia = this.dias[index];
        //request.activo = request.activo;
        this._diaService.eliminarDia(dia.za_carrera,dia.za_jornada,dia.za_dia)
          .subscribe((res:IServerResponse) => {
            if(res.status == 200){
              this.cargarDias()
            } else {
              console.error(res);
            }
          }, error => console.error(error));

      }

    });

  }

  public cambioCarrera(): void{
    this.jornadas = [];
    this.dias = [];
    this.za_jornada = undefined;
    this.cargarJornadas();
  }

  public cargarJornadas():void {
    if (this.za_carrera) {
      this._jornadasService.listJornadas(this.za_carrera)
        .subscribe((res:IServerResponse)=>{
          if(res.status == 200){
            this.jornadas = res.data;
          } else {
            console.error(res);
          }
        }, error => console.error(error));
    }
  }

  public cargarDias():void {
    if (this.za_jornada) {
      this._diaService.listDias(this.za_carrera, this.za_jornada)
        .subscribe((res:IServerResponse) => {
          if(res.status == 200){
            this.dias = res.data;
          } else {
            console.error(res);
          }
        }, error => console.error(error));
    }
  }
}
