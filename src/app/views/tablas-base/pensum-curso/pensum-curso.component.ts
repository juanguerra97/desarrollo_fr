import { Component, OnInit } from '@angular/core';
import {PensumService} from '../../../services/pensum.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';
import {PensumCarreraService} from '../../../services/pensum-carrera.service';
import {CursosService} from '../../../services/cursos.service';

@Component({
  selector: 'app-pensum-curso',
  templateUrl: './pensum-curso.component.html',
  styleUrls: ['./pensum-curso.component.scss']
})
export class PensumCursoComponent implements OnInit {
  public pensums: any;
  public pensum: any;
  public curso: any;
  public za_pensum: any;
  public za_curso: any;
  public form = {
    za_carrera: 0,
    ano_pensum: '',
    za_curso: '',
    ciclo: '',
    activo: true,
    accion: 1
  };
  public carreras: any;
  public conexiones: any;
  public za_carrera: 0;
  public cursos: any;

  clearForm() {
    this.form = {
      za_carrera: 0,
      ano_pensum: '',
      za_curso: '',
      ciclo: '',
      activo: true,
      accion: 1
    };
  }

  constructor(private _pensumService: PensumService,
              private modalService: NgbModal,
              private _carreraService: CarrerasService,
              private _cursosService: CursosService,
              private _conexion: PensumCarreraService
              ) {
    this._cursosService.listCursos().subscribe(res => { this.cursos = res; });
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
    this.clearForm();
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  guardar() {
    this.form.za_carrera = this.za_carrera;
    this._conexion.crearPensum(this.form).subscribe(() => {this.getPensums(); } );
    this.modalService.dismissAll();
  }

  getPensums() {
    this._pensumService.listPensums(this.za_carrera).subscribe((res) => {this.pensums = res; });
  }

  getConexion() {
    this._conexion.listPensums(this.za_carrera, this.za_pensum, this.za_curso).subscribe((res) => {this.conexiones = res; });
  }
}
