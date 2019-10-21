import { Component, OnInit } from '@angular/core';
import { Reporte3Service } from '../../../services/reporte3.Service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EnvioPdfService} from '../../../services/envio-pdf.service';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var jsPDF: any;

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})

export class CursosComponent implements OnInit {
  public reportes3 : any;

  // formulario para envio de correo
  public formEnvioCorreo = new FormGroup({
    correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
  });

constructor(
  private _cursorepService: Reporte3Service,
  private envioPdfService: EnvioPdfService,
  private modalService: NgbModal
) {}

  ngOnInit() {
    this._cursorepService.listReporte3().subscribe( res => { this.reportes3 = res[0]; },
      err => console.error(err)
    );
  }

  public guardarPdf():void {


    let pdf = this.crearPdf();
    pdf.save('totalcursosporcatedratico.pdf');

  }

  public onEnviarCorreo():void {
    let pdf = this.crearPdf();
    this.envioPdfService.enviarPdf(this.formEnvioCorreo.value.correo,pdf.output("datauristring"))
      .subscribe((res:IServerResponse)=>{
        if(res.status == 200){
          console.log(res);
        } else {
          console.error(res);
        }
      }, error => {
        console.error(error);
      });
    this.modalService.dismissAll();
  }

  private crearPdf() {
    let pdf = new jsPDF();

    pdf.setFontSize(10);
    pdf.autoTable({
      html:'#tabla-reporte', // id de la tabla
      theme:'grid'
    });
    return pdf;
  }

  public openModalEnvioCorreo(content):void {

    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });

  }

};
