import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pensums',
  templateUrl: './pensums.component.html',
  styleUrls: ['./pensums.component.scss']
})
export class PensumsComponent implements OnInit {


  ngOnInit() {
    this._pensumService.listPensums().subscribe(res => { this.pensums = res; });
  }

  editar(index) {
    const pensum = this.pensums[index];
    Swal.fire({
      title: 'Editar Pensum',
      html:
        '<form id="modal-form">' +
        `<input id="codigo_pensum" placeholder="Codigo" class="swal2-input" value="${pensum.codigo_pensum}">` +
        `<input id="nombre_pensum"  placeholder="Nombre" class="swal2-input" value="${pensum.nombre_pensum}">` +
        `<input type="checkbox" id="activo"  placeholder="Activo" class="swal2-checkbox" ` +
        `${(pensum.activo.data[0] === 1) ? 'checked' : ''}>` +
        `Activo` +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_pensum: this.pensums[index].za_pensum,
          codigo_pensum: $('#codigo_pensum').val(),
          nombre_pensum:  $('#nombre_pensum').val(),
          activo: $('#activo')[0].checked ? 1 : 0,
          accion: 1
        };
      },
    }).then(res => {
      this._pensumService.crearPensum(res.value).subscribe(() => {
        this._pensumService.listPensums().subscribe(respuesta => { this.pensums = respuesta; });
      });
    });
  }

  eliminar(index) {
    const request = {...this.pensums[index], accion: 2};
    request.activo = request.activo.data;
    this._pensumService.crearPensum(request).subscribe();
  }

  openModal(id: string) {
    Swal.fire({
      title: 'Nueva Pensum',
      html:
        '<form id="modal-form">' +
        '<input id="codigo_pensum" placeholder="Codigo" class="swal2-input" >' +
        '<input id="nombre_pensum"  placeholder="Nombre" class="swal2-input">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          za_pensum: 0,
          codigo_pensum: $('#codigo_pensum').val(),
          nombre_pensum:  $('#nombre_pensum').val(),
          activo: true,
          accion: 1

        };
      },
    }).then(res => {
      this._pensumService.crearPensum(res.value).subscribe(
        () => {
          this._pensumService.listPensums().subscribe(respuesta => { this.pensums = respuesta; });
        }
      );
    });
  }
}
