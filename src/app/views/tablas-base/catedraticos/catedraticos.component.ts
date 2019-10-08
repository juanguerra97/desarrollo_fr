import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarrerasService } from '../../../../services/carreras.service';
import { CatedraticosService } from '../../../services/catedraticos.service';
import Swal from "sweetalert2";
import {IServerResponse} from '../../../models/iserverresponse.model';
import {ICatedratico} from '../../../models/icatedratico.model';
import {ICarrera} from '../../../models/icarrera.model';

@Component({
  selector: 'app-catedraticos',
  templateUrl: './catedraticos.component.html',
  styleUrls: ['./catedraticos.component.scss']
})
export class CatedraticosComponent implements OnInit {

  public catedraticos: ICatedratico[];
  public catedratico: ICatedratico = null;

  public form:ICatedratico = {
    za_profesor: 0,
    nombres: '',
    apellidos: '',
    profesion: '',
    activo: 1
  };

  public carreras: ICarrera[];
  public za_carrera:number = 0;

  constructor(
    private _catedraticoService: CatedraticosService,
    private modalService: NgbModal,
    private _carreraService: CarrerasService
  ) { }

  ngOnInit() {
    this._carreraService.listCarreras()
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.carreras = res.data;
        } else {
          console.error(res);
        }
      }, error => console.error(error));
    this.cargarCatedraticos();
  }

  // abre el modal para editar un catedratico
  openModalEdicion(index, content) {
    this.form = JSON.parse(JSON.stringify(this.catedraticos[index]));
    this.catedratico = this.catedraticos[index];
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  // pide confirmacion y luego elimina el catedratico
  eliminar(index):void {

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

        this._catedraticoService.eliminarCatedratico(this.catedraticos[index].za_profesor)
          .subscribe((res:IServerResponse) => {
            if(res.status == 200){
              this.cargarCatedraticos()
            } else {
              console.error(res);
            }
          }, error => {
            console.error(error);
          });

      }

    });

  }

  // abre el modal para un nuevo catedratico
  openModalNuevo(content) {
    this.catedratico = null;
    this.clearForm();
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  // guarda un nuevo catedratico
  public guardarNuevo():void {
    this._catedraticoService.crearCatedratico(this.form)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cargarCatedraticos();
        }else {
          console.error(res);
        }
      }, error => console.error(error));
    this.modalService.dismissAll();
  }

  // guarda la actualizacion a los datos de un catedratico
  public guardarEdicion():void {
    this._catedraticoService.editarCatedratico(this.form.za_profesor, this.form)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cargarCatedraticos();
        }else {
          console.error(res);
        }
      }, error => console.error(error));
    this.modalService.dismissAll();
  }

  // carga la lista de catedraticos
  private cargarCatedraticos():void {

    this._catedraticoService.listCatedraticos()
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.catedraticos = res.data;
        } else {
          console.error(res);
        }
      },
    error => {
        console.error(error);
      });
  }

  // 'limpia' los valores del formulario
  clearForm():void {
    this.form.za_profesor = 0;
    this.form.nombres = '';
    this.form.apellidos = '';
    this.form.profesion = '';
    this.form.activo = 1;
  }

}
