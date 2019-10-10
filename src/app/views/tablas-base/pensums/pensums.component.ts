import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";

import {PensumService} from '../../../services/pensum.service';
import {CarrerasService} from '../../../../services/carreras.service';
import {ICarrera} from '../../../models/icarrera.model';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {IPensum} from '../../../models/ipensum';

@Component({
  selector: 'app-pensums',
  templateUrl: './pensums.component.html',
  styleUrls: ['./pensums.component.scss']
})
export class PensumsComponent implements OnInit {

  public pensums: IPensum[] = [];
  public pensum: IPensum = null;
  public form = {
    za_carrera: 0,
    ano_pensum: 1990,
    codigo_pensum: '',
    activo: true,
    accion: 1
  };
  public carreras: ICarrera[] = [];
  public za_carrera:number = 0;

  clearForm() {
    this.form = {
      za_carrera: 0,
      ano_pensum: 1990,
      codigo_pensum: '',
      activo: true,
      accion: 1
    };
  }

  constructor(
    private _pensumService: PensumService,
    private modalService: NgbModal,
    private _carreraService: CarrerasService)
  { }


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

    this.cargarPensums();
  }

  editar(index, content) {
    this.pensum = JSON.parse(JSON.stringify(this.pensums[index]));
    this.form = JSON.parse(JSON.stringify(this.pensums[index]));
    this.form.accion = 1;
    this.form.activo = this.pensum.activo != 0;
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

        const p = this.pensums[index];
        this._pensumService.eliminarPensum(p.za_carrera,p.ano_pensum)
          .subscribe((res:IServerResponse) => {
            if(res.status == 200){
              this.cargarPensums();
            } else {
              console.error(res);
            }
          }, error => console.error(error));

      }

    });



  }

  public openModalNuevo(content):void {
    this.pensum = null;
    this.clearForm();
    this.modalService.open(content, {
      ariaLabelledBy: 'new-curso-title',
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });
  }

  public guardarNuevo():void {
    const p = JSON.parse(JSON.stringify(this.form));
    p.activo = p.activo ? 1 : 0;
    this._pensumService.crearPensum(p)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.cargarPensums();
        } else {
          console.error(res);
        }
      }, error => console.error(error));
    this.modalService.dismissAll();
  }

  public guardarEdicion(): void {

    const p = JSON.parse(JSON.stringify(this.form));
    p.activo = p.activo ? 1 : 0;

    this._pensumService.editarPensum(this.pensum.za_carrera,this.pensum.ano_pensum,p)
      .subscribe((res:IServerResponse)=>{
        if(res.status == 200){
          this.cargarPensums();
        } else {
          console.error(res);
        }
      }, error => console.error(error));

    this.modalService.dismissAll();
  }

  public cargarPensums():void {
    this._pensumService.listPensums(this.za_carrera)
      .subscribe((res:IServerResponse) => {
        if(res.status == 200){
          this.pensums = res.data;
        } else {
          console.error(res);
        }
      }, error => console.error(error));
  }


  convertTobool(obj: any) {
    return obj;
  }

}
