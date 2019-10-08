import { Component, OnInit } from '@angular/core';



import { CursosService } from '../../../services/cursos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {ICurso} from '../../../models/icurso.model';
import {ICarrera} from '../../../models/icarrera.model';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  public cursos: ICurso[] = [];
  public curso: ICurso = null;

  public res: {
    activo:number
  };

  public form:ICurso = {
    za_curso: 0,
    nombre_curso: '',
    usa_laboratorio: true,
    activo: true
  };

  public carreras: ICarrera[] = [];
  public za_carrera: 0;

  constructor(
    private _cursoService: CursosService,
    private _carreraService: CarrerasService,
    private modalService: NgbModal,
  ) { }


  ngOnInit() {

    // se cargan las carreras
    this._carreraService.listCarreras().subscribe((res:IServerResponse) => {
      if(res.status == 200){
        this.carreras = res.data;
      } else {
        console.error(res);
      }
    }, error => console.error(error));

    this.cargarCursos();
  }

  editar(content, index) {
    this.form = JSON.parse(JSON.stringify(this.cursos[index]));
    this.curso = this.cursos[index];
    this.form.activo = this.form.activo != 0 ? true : false;
    this.form.usa_laboratorio = this.form.usa_laboratorio != 0 ? true : false;
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  eliminar(index) {

    this.form = this.cursos[index];
    /*this.form.activo = this.convertTobool(this.form.activo);
    this.form.usa_laboratorio = this.convertTobool(this.form.usa_laboratorio);*/
    this._cursoService.eliminarCurso(this.cursos[index].za_curso)
      .subscribe((res:IServerResponse)=>{
        if(res.status == 200){
          this.cargarCursos();
        } else {
          console.error(res);
        }
      }, error => console.error(error));
  }

  convertTobool(obj: any) {
    return obj;
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

  public guardarNuevo():void {

    this.form.usa_laboratorio = this.form.usa_laboratorio ? 1 : 0;
    this.form.activo = this.form.activo ? 1 : 0;
    this._cursoService.crearCurso(this.form)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cargarCursos();
        } else {
          console.error(res);
        }
      }, error => console.error(error));
    this.modalService.dismissAll();

  }

  public guardarEdicion(): void {

    this.form.usa_laboratorio = this.form.usa_laboratorio ? 1 : 0;
    this.form.activo = this.form.activo ? 1 : 0;
    this._cursoService.editarCurso(this.form.za_curso,this.form)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cargarCursos();
        } else {
          console.error(res);
        }
      }, error => console.error(error));
    this.modalService.dismissAll();
  }

  private cargarCursos():void {

    this._cursoService.listCursos().subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cursos = res.data;
        } else {
          console.error(res);
        }
    }, error => console.error(error));

  }

  vaciarForm():void {

    this.form.za_curso =  0;
    this.form.nombre_curso = '';
    this.form.usa_laboratorio = true;
    this.form.activo = true;

  }

}
