import { Component, OnInit } from '@angular/core';
import { Reporte3Service } from '../../../services/reporte3.Service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var jsPDF: any;

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})

export class CursosComponent implements OnInit {
  public reportes3 : any;

constructor(private _cursorepService: Reporte3Service) {}

  ngOnInit() {
    this._cursorepService.listReporte3().subscribe( res => { this.reportes3 = res[0]; },
      err => console.error(err)
    );
  }

  public guardarPdf():void {


    let pdf = new jsPDF();

    //let p2 = new myPDF();
    pdf.setFontSize(10);
    pdf.autoTable({
      html:'#tabla-reporte', // id de la tabla
      theme:'grid'
    });
    pdf.save('totalcursosporcatedratico.pdf');

  }

};
