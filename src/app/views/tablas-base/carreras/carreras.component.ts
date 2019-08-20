import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {CarrerasService} from '../../../../services/carreras.service';

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
          '<input id="codigo_carrera" placeholder="Codigo" class="swal2-input" value="1">' +
          '<input id="nombre_carrera"  placeholder="Nombre" class="swal2-input">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          codigo_carrera: document.getElementById('codigo_carrera').value,
          nombre_carrera: document.getElementById('nombre_carrera').value

        };
      },
    }).then(res => {
      this._carreraService.crearCarrera(res.value);
    });
  }
}
