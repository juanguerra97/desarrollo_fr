import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {CarrerasService} from '../../../../services/carreras.service';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {ICarrera} from '../../../models/icarrera.model';

declare var $: any;

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {
  public carreras: ICarrera[] = [];

  constructor(
    private _carreraService: CarrerasService
  ) { }

  ngOnInit() {
    this.cargarCarreras();
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
        `${(carrera.activo === 1) ? 'checked' : ''}>` +
        `Activo` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_carrera: this.carreras[index].za_carrera,
          codigo_carrera: $('#codigo_carrera').val(),
          nombre_carrera:  $('#nombre_carrera').val(),
          activo: $('#activo')[0].checked ? 1 : 0,
        };
      },
    }).then(res => {
      this._carreraService.editarCarrera(res.value.za_carrera,res.value)
        .subscribe((res:IServerResponse) => {
          if(res.status == 200){
            this.cargarCarreras();
          } else {
            console.error(res);
          }
        }, error => console.error(error));
    });
  }

  eliminar(index) {

    Swal.fire({
      title: 'Estas a punto de eliminar una carrera',
      text: "La eliminacion no se puede revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._carreraService.eliminarCarrera(this.carreras[index].za_carrera)
          .subscribe((res:IServerResponse) => {
            if(res.status == 200){
              this.cargarCarreras();
            } else {
              console.error(res);
            }
          }, error => console.error(error));

      }

    });

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
          activo: 1

        };
      },
    }).then(res => {
      this._carreraService.crearCarrera(res.value)
        .subscribe((res:IServerResponse) => {
          if(res.status == 200){
            this.cargarCarreras();
          } else {
            console.error(res);
          }
        }, error => console.error(error));
    });
  }

  private cargarCarreras():void {

    this._carreraService.listCarreras().subscribe((res:IServerResponse)=>{
      if(res.status == 200){
        this.carreras = res.data;
      } else {
        console.error(res);
      }
    }, error => console.error(error));

  }

}
