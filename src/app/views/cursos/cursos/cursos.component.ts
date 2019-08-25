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
  public res: {
    activo: {
      data: any
    }
  };
  public form = {
    za_curso: 0,
    nombre_curso: '',
    usa_laboratorio: true,
    activo: true,
    accion: 1
  };
  public carreras: any;
  public za_carrera: 0;
  vaciarForm() {
    this.form = {
      za_curso: 0,
      nombre_curso: '',
      usa_laboratorio: true,
      activo: true,
      accion: 1
    };
  }


  constructor(private _cursoService: CursosService, private modalService: NgbModal, private _carreraService: CarrerasService) {
    this._carreraService.listCarreras().subscribe(res => { this.carreras = res; });
  }


  ngOnInit() {
    this.getCursos();
  }

  editar(content, index) {
    this.form = this.cursos[index];
    this.form.accion = 1;
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  eliminar(index) {
    this.form = this.cursos[index];
    this.form.activo = this.convertTobool(this.form.activo);
    const request = {...this.form, accion: 2};
    this._cursoService.crearCurso(request).subscribe(this.getCursos);
  }

  convertTobool(obj: any) {
    return obj.data[0];
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
    this.modalService.dismissAll();
    this._cursoService.crearCurso(this.form).subscribe(this.getCursos);
  }

  getCursos = () => {
    setTimeout(() => {
      this._cursoService.listCursos().subscribe((res) => {
        this.cursos = res;
      });
    }
    , 1000);
  }
}
