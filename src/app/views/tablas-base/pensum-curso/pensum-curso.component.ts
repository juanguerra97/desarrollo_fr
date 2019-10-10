import { Component, OnInit } from '@angular/core';
import {PensumService} from '../../../services/pensum.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrerasService} from '../../../../services/carreras.service';
import {CursosService} from '../../../services/cursos.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CursoPensumService} from '../../../services/curso-pensum.service';

import Swal from 'sweetalert2';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {ICarrera} from '../../../models/icarrera.model';
import {ICurso} from '../../../models/icurso.model';

@Component({
  selector: 'app-pensum-curso',
  templateUrl: './pensum-curso.component.html',
  styleUrls: ['./pensum-curso.component.scss']
})
export class PensumCursoComponent implements OnInit {

  public pensumCurso: any = null;
  public carreras:ICarrera[]=[];
  public cursos:ICurso[]=[];
  public pensumsCarrera:any[]=[];
  public pensumsCursos:any[]=[];

  public formFiltro = new FormGroup({
    za_carrera: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    ano_pensum: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ])
  });

  public formNewCursoPensum = new FormGroup({
    za_curso: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    ciclo: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ])
  });

  public formEditarCursoPensum = new FormGroup({
    ciclo: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ])
  });

  constructor(
    private _pensumService: PensumService,
    private modalService: NgbModal,
    private _carreraService: CarrerasService,
    private _cursosService: CursosService,
    private cursoPensumService: CursoPensumService
  ) {  }

  ngOnInit() {

    // se cargan las carreras
    this._carreraService.listCarreras()
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.carreras = res.data;
        } else {
          console.error(res);
        }
      }, error => console.error(error));

    this._cursosService.listCursos().subscribe((res:IServerResponse) => {
      if(res.status == 200){
        this.cursos = res.data;
      } else {
        console.error(res);
      }
    }, error => console.error(error));
  }


  eliminar(index) {

    Swal.fire({
      title: 'Estas a punto de eliminar un curso del pensum',
      text: "La eliminacion no se puede revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        const cursopensum = this.pensumsCursos[index];
        this.cursoPensumService.eliminarCursoPensum(cursopensum.za_carrera,cursopensum.ano_pensum,cursopensum.za_curso)
          .subscribe((res:IServerResponse)=>{
            if(res.status == 200){
              this.cargarPensumsCursos();
            } else {
              console.error(res);
            }
          }, error => console.error(error));

      }

    });


  }

  // abre el modal con el formulario para editar el ciclo de una relacion pensum-curso
  openModalEdicion(content,index){

    this.pensumCurso = this.pensumsCursos[index];
    this.formEditarCursoPensum.setValue({
      ciclo: this.pensumCurso.ciclo
    });

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-edicion-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });

  }

  // abre el modal con el formulario para ingresar una nueva relacion pensum-curso
  openModalNuevo(content) {

    this.formNewCursoPensum.reset();

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-nuevo-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  // submit del formulario para agregar una nueva relacion pensum-curso
  public onSubmitNuevo(): void{

    let cursopensum = {...this.formFiltro.value,...this.formNewCursoPensum.value, activo: 1};

    this.cursoPensumService.crearCursoPensum(cursopensum)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cargarPensumsCursos()
        } else {
          console.error(res);
        }
      }, error => console.error(error));

    this.modalService.dismissAll();

  }

  // submit del formulario de edicion
  public onSubmitEditar():void {

    let cursopensum = this.pensumCurso;
    cursopensum.ciclo = this.formEditarCursoPensum.value.ciclo;

    this.cursoPensumService.editarCursoPensum(cursopensum.za_carrera,cursopensum.ano_pensum,cursopensum.za_curso,cursopensum)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cargarPensumsCursos();
          this.pensumCurso = null;
        } else {
          console.error(res);
        }
      }, error => console.error(error));

    this.modalService.dismissAll();

  }

  public onCambioCarrera(){
    this.pensumsCarrera = [];
    this.pensumsCursos = [];
    this.formFiltro.get('ano_pensum').reset();
    this.cargarPensumsCarrera();
  }

  // carga los pensums de la carrera seleccionada
  public cargarPensumsCarrera():void {
    this._pensumService.listPensums(this.formFiltro.value.za_carrera)
      .subscribe((res:any)=>this.pensumsCarrera = res);
  }

  // carga las relaciones pensum-curso filtrados por carrera y pensum
  // solo muestra los cursos de la carrera y pensum seleccionados
  public cargarPensumsCursos():void {
    if(this.formFiltro.get('za_carrera').valid){
      this.cursoPensumService.listPensumsCursos(this.formFiltro.value.za_carrera,this.formFiltro.value.ano_pensum)
        .subscribe((res:IServerResponse)=>{
          if(res.status == 200){
            this.pensumsCursos = res.data;
          } else {
            console.error(res);
          }
        }, error => console.error(error));
    }
  }

}
