import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Reporte2Service} from '../../../services/reporte2.Service';
import { Location } from '@angular/common';
import {CatedraticosService} from '../../../services/catedraticos.service';
import {ICatedratico} from '../../../models/icatedratico.model';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {EnvioPdfService} from '../../../services/envio-pdf.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

declare var jsPDF: any;

@Component({
  selector: 'app-catedraticos',
  templateUrl: './catedraticos.component.html',
  styleUrls: ['./catedraticos.component.scss']
})
export class CatedraticosComponent implements OnInit {
  public conexiones:any[]=[];
  public catedraticos:ICatedratico[]=[];

  private filtro:any = null;

  public enviandoCorreo:boolean = false;

  // formulario para envio de correo
  public formEnvioCorreo = new FormGroup({
    correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
  });

  constructor(
    public reporte2Service: Reporte2Service,
    private location: Location,
    private catedraticosService:CatedraticosService,
    private envioPdfService: EnvioPdfService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ){ }

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
    this.reporte2Service.buscarreporte2(reporteForm.value).subscribe((res:any)=> {this.conexiones = res;});

  }

  public guardarPdf():void {

    let pdf = this.crearPdf();
    pdf.save('catedraticos.pdf');

  }

  public onEnviarCorreo():void {
    this.enviandoCorreo = true;
    let pdf = this.crearPdf();
    this.envioPdfService.enviarPdf(this.formEnvioCorreo.value.correo,pdf.output("datauristring"),'Horarios catedratico','Reporte con los horarios de catedratico','HorariosCatedratico.pdf')
      .subscribe((res:IServerResponse)=>{
        if(res.status == 200){
          this.toastr.success('Correo enviado');
        } else {
          this.toastr.error(res.error);
          console.error(res);
        }
        this.enviandoCorreo = false;
      }, error => {
        console.error(error);
        this.enviandoCorreo = false;
      });
    this.modalService.dismissAll();
  }

  private crearPdf() {
    let pdf = new jsPDF();

    pdf.setFontSize(10);
    pdf.autoTable({
      html:'#tabla-reporte', // id de la tabla
      theme:'grid',
      start: 35
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

}
