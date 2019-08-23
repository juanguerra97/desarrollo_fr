import { Component, OnInit } from '@angular/core';
import {PensumService} from '../../../services/pensum.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';

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


  constructor(private _pensumService: PensumService, private modalService: NgbModal, private _carreraService: CarrerasService) {
    this._carreraService.listCarreras().subscribe(res => { this.carreras = res; });
  }


  ngOnInit() {
    this.getPensums();
  }

  editar(index) {
  }

  eliminar(index) {
    const request = {...this.pensums[index], accion: 2};
    request.activo = request.activo.data;
    this._pensumService.crearPensum(request).subscribe();
  }

  openModal(content) {
    this.pensum = null;
    console.log(this.pensum);
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  guardar() {
    this._pensumService.crearPensum(this.form).subscribe(() => {debugger;});
  }

  getPensums() {
    this._pensumService.listPensums(this.za_carrera).subscribe((res) => {this.pensums = res; });
  }
}
