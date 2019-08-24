import { Component, OnInit } from '@angular/core';



import { CursosService } from '../../../services/cursos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  public cursos: any;
  public curso: any;
  public form = {
    za_curso: 0,
    nombre_curso: '',
    usa_laboratorio: '',
    activo: 1,
    accion: 1
  };
  public carreras: any;
  public za_carrera: 0;
  vaciarForm() {
    this.form = {
      za_curso: 0,
      nombre_curso: '',
      usa_laboratorio: '',
      activo: 1,
      accion: 1
    };
  }


  constructor(private _cursoService: CursosService, private modalService: NgbModal, private _carreraService: CarrerasService) {
    this._carreraService.listCarreras().subscribe(res => { this.carreras = res; });
  }


  ngOnInit() {
    this.getCursos();
  }

  editar(index) {
  }

  eliminar(index) {
    const request = {...this.cursos[index], accion: 2};
    request.activo = request.activo.data;
    this._cursoService.crearCurso(request).subscribe();
  }

  openModal(content) {
    this.curso = null;
    this.vaciarForm();
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  guardar() {
    this._cursoService.crearCurso(this.form).subscribe(() => {this.getCursos(); });
  }

  getCursos() {
    this._cursoService.listCursos().subscribe((res) => {this.cursos = res; });
  }
}
