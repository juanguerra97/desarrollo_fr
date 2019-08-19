import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openModal(id: string) {
    Swal.fire({
      title: 'Nueva Carrera',
      html:
        '<form id="modal-form">' +
          '<input name="codigo_carrera" placeholder="Codigo" class="swal2-input">' +
          '<input id="nombre_carrera"  placeholder="Nombre" class="swal2-input">' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ];
      }
    });
  }
}
