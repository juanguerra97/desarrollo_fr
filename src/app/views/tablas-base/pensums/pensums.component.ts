import { Component, OnInit } from '@angular/core';
import {PensumService} from '../../../services/pensum.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-pensums',
  templateUrl: './pensums.component.html',
  styleUrls: ['./pensums.component.scss']
})
export class PensumsComponent implements OnInit {
  public pensums: any;
  public pensum: any;
  public form = {
    za_carrera: 0,
    ano_pensum: 1990,
    codigo_pensum: '',
    activo: true,
    accion: 1
  };
  public carreras: any;
  public za_carrera: 0;

  clearForm() {
    this.form = {
      za_carrera: 0,
      ano_pensum: 1990,
      codigo_pensum: '',
      activo: true,
      accion: 1
    };
  }

  constructor(private _pensumService: PensumService, private modalService: NgbModal, private _carreraService: CarrerasService) {
    this._carreraService.listCarreras().subscribe(res => { this.carreras = res; });
  }


  ngOnInit() {
    this.getPensums();
  }

  editar(index, content) {
    this.form = this.pensums[index];
    this.form.accion = 1;
    this.form.activo = this.convertTobool(this.form.activo);
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  eliminar(index) {

    Swal.fire({
      title: 'Estas a punto de eliminar un pensum',
      text: "La eliminacion no se puede revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        const request = {...this.pensums[index], accion: 2};
        //request.activo = request.activo;
        this._pensumService.crearPensum(request).subscribe(() => this.getPensums());

      }

    });



  }

  openModal(content) {
    this.pensum = null;
    this.clearForm();
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  guardar() {
    this._pensumService.crearPensum(this.form).subscribe(() => {this.getPensums(); } );
    this.modalService.dismissAll();
  }

  getPensums() {
    this._pensumService.listPensums(this.za_carrera).subscribe((res) => {this.pensums = res; });
  }


  convertTobool(obj: any) {
    return obj;
  }

}
