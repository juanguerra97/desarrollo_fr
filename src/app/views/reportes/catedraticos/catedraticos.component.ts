import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Reporte2Service} from '../../../services/reporte2.Service';
import { Location } from '@angular/common';
import {CatedraticosService} from '../../../services/catedraticos.service';

declare var jsPDF: any;

@Component({
  selector: 'app-catedraticos',
  templateUrl: './catedraticos.component.html',
  styleUrls: ['./catedraticos.component.scss']
})
export class CatedraticosComponent implements OnInit {
  public conexiones;
  public catedraticos:any[]=[];

  private filtro:any = null;

  constructor(public reporte2Service: Reporte2Service,
              private location: Location,
              private catedraticosService:CatedraticosService
  ){
  }

  ngOnInit() {
    this.catedraticosService.listCatedraticos()
      .subscribe((res:any)=>this.catedraticos = res ,
        (error:any) => this.catedraticos=[]
      );
  }
  OnEnviar(reporteForm: NgForm ){
    this.filtro = reporteForm.value;
    this.reporte2Service.buscarreporte2(reporteForm.value).subscribe((res)=> {this.conexiones = res, console.log(res)});

  }

  public guardarPdf():void {

    /*html2canvas(document.getElementById('tabla-reporte'))
      .then(canvas => {
        let pdf = new jsPDF('p','mm','a4');
        pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0, 208, canvas.height * 208 / canvas.width);
        pdf.save('planificacion.pdf');
      });*/

    let pdf = new jsPDF();

    //let p2 = new myPDF();
    pdf.setFontSize(10);
    pdf.autoTable({
      html:'#tabla-reporte', // id de la tabla
      theme:'grid',
      start: 35
    });
    pdf.save('catedraticos.pdf');

  }

}
