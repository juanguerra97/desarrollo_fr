import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';
import {CatedraticosService} from '../../../services/catedraticos.service';

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

  editar(index) {
  }

  eliminar(index) {
    const request = {...this.catedraticos[index], accion: 2};
    request.activo = request.activo.data;
    this._catedraticoService.crearCatedratico(request).subscribe();
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
