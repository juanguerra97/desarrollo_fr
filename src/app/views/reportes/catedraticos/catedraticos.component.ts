import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Reporte2Service} from '../../../services/reporte2.Service';
import { Location } from '@angular/common';
import {CatedraticosService} from '../../../services/catedraticos.service';
import {ICatedratico} from '../../../models/icatedratico.model';
import {IServerResponse} from '../../../models/iserverresponse.model';

declare var jsPDF: any;

@Component({
  selector: 'app-catedraticos',
  templateUrl: './catedraticos.component.html',
  styleUrls: ['./catedraticos.component.scss']
})
export class CatedraticosComponent implements OnInit {
  public conexiones;
  public catedraticos:ICatedratico[]=[];

  private filtro:any = null;

  constructor(public reporte2Service: Reporte2Service,
              private location: Location,
              private catedraticosService:CatedraticosService
  ){
  }

  ngOnInit() {

    // se cargan los catedraticos
    this.catedraticosService.listCatedraticos()
      .subscribe((res:IServerResponse) => {
          if(res.status == 200) {
            this.catedraticos = res.data;
          } else {
            console.error(res);
          }
        } ,
        (error:any) => {
          this.catedraticos=[];
          console.error(error);
        }
      );

  }
  OnEnviar(reporteForm: NgForm ){
    this.filtro = reporteForm.value;
    this.reporte2Service.buscarreporte2(reporteForm.value).subscribe((res)=> {this.conexiones = res, console.log(res)});

  }

  public guardarPdf():void {

    let pdf = new jsPDF();

    pdf.setFontSize(10);
    pdf.autoTable({
      html:'#tabla-reporte', // id de la tabla
      theme:'grid',
      start: 35
    });
    pdf.save('catedraticos.pdf');

  }

}
