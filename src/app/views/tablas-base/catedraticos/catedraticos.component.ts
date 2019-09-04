import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';
import {CatedraticosService} from '../../../services/catedraticos.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-catedraticos',
  templateUrl: './catedraticos.component.html',
  styleUrls: ['./catedraticos.component.scss']
})
export class CatedraticosComponent implements OnInit {
  public catedraticos: any;
  public catedratico: any;
  public form = {
    za_profesor: 0,
    nombres: '',
    apellidos: '',
    profesion: '',
    activo: true,
    accion: 1
  };
  public carreras: any;
  public za_carrera: 0;

  clearForm() {
    this.form = {
      za_profesor: 0,
      nombres: '',
      apellidos: '',
      profesion: '',
      activo: true,
      accion: 1
    };
  }

  constructor(private _catedraticoService: CatedraticosService, private modalService: NgbModal, private _carreraService: CarrerasService) {
    this._carreraService.listCarreras().subscribe(res => { this.carreras = res; });
  }


  ngOnInit() {
    this.getCatedraticos();

  }

  editar(index, content) {
    this.form = this.catedraticos[index];
    this.form.accion = 1;
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  eliminar(index) {

    Swal.fire({
      title: 'Estas a punto de eliminar a un catedratico',
      text: "La eliminacion no se puede revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        const request = {...this.catedraticos[index], accion: 2};
        request.activo = request.activo.data;
        this._catedraticoService.crearCatedratico(request).subscribe(() => this.getCatedraticos());

      }

    });

  }

  openModal(content) {
    this.catedratico = null;
    this.clearForm();
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  guardar() {
    this._catedraticoService.crearCatedratico(this.form).subscribe(() => {this.getCatedraticos(); } );
    this.modalService.dismissAll();
  }

  getCatedraticos() {
    this._catedraticoService.listCatedraticos().subscribe((res) => {this.catedraticos = res; });
  }
}
