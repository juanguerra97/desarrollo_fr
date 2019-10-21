import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { groupBy }  from 'lodash';

import {ISeccion} from '../../../models/iseccion.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarrerasService} from '../../../../services/carreras.service';
import {JornadasService} from '../../../services/jornadas.service';
import {AsigService} from '../../../services/asig.service';
import {IServerResponse} from '../../../models/iserverresponse.model';
import {PensumService} from '../../../services/pensum.service';
import {ICarrera} from '../../../models/icarrera.model';
import {IJornada} from '../../../models/ijornada';
import {IPensum} from '../../../models/ipensum';
import {EnvioPdfService} from '../../../services/envio-pdf.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var jsPDF: any;

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss']
})
export class PlanificacionComponent implements OnInit {

  public filtro:ISeccion=null; // seccion a la que deberán pertenecer las asignaciones
  public asignaciones:any={};
  public dias:any;
  public carreras:ICarrera[]=[];
  public pensums:IPensum[]=[];
  public jornadas:IJornada[]=[];
  public carrera:ICarrera;
  public jornada:IJornada = null;

  public cargandoPlanificacion:boolean = false;
  public textoBtnVerPlanificacion:string = 'Ver planificacion';

  public exportandoPdf:boolean = false;
  public textoBtnExpPdf: string = 'Exportar a PDF';

  public enviandoCorreo:boolean = false;

  private PosicionDia = {
    'DOMINGO': 1,
    'LUNES': 2,
    'MARTES': 3,
    'MIERCOLES': 4,
    'JUEVES': 5,
    'VIERNES': 6,
    'SABADO': 7,
    'MIÉRCOLES': 4,
    'SÁBADO': 4,
    'domingo': 1,
    'lunes': 2,
    'martes': 3,
    'miercoles': 4,
    'jueves': 5,
    'viernes': 6,
    'sabado': 7,
    'miércoles':4,
    'sábado': 7,
    'Domingo': 1,
    'Lunes':2,
    'Martes':3,
    'Miercoles': 4,
    'Jueves': 5,
    'Viernes': 6,
    'Sabado': 7,
    'Miércoles': 4,
    'Sábado': 7
  };

  // formulario para la seccion a filtrar
  public formFiltro = new FormGroup({
    za_carrera: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    ano_pensum: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    ano: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    no_semestre: new FormControl('1',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    za_jornada: new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    seccion: new FormControl('',[
      Validators.required,
      Validators.pattern('[A-Z]')
    ])
  });

  // formulario para envio de correo
  public formEnvioCorreo = new FormGroup({
    correo: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
  });

  constructor(
    private carrerasService: CarrerasService,
    private pensumService: PensumService,
    private jornadasService: JornadasService,
    private asigService: AsigService,
    private envioPdfService: EnvioPdfService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.carrerasService.listCarreras().subscribe((res:IServerResponse)=>{
      if(res.status == 200){
        this.carreras = res.data;
      } else {
        console.error(res);
      }
    }, error => console.error(error));

  }

  public onFiltrar():void {

    this.cargandoPlanificacion = true;
    this.textoBtnVerPlanificacion = 'Cargando...';

    this.filtro = this.formFiltro.value;

    this.carrera = this.carreras[this.carreras.findIndex(carr=>carr.za_carrera == this.filtro.za_carrera)];
    this.jornada = this.jornadas[this.jornadas.findIndex(jor => jor.za_carrera == this.filtro.za_carrera && jor.za_jornada == this.filtro.za_jornada)];

    this.cargarAsignaciones();

  }

  public guardarPdf():void {

    this.exportandoPdf = true;
    this.textoBtnExpPdf = 'Exportando...';

    let pdf = this.crearPdf();
    pdf.save('planificacion.pdf');

    this.exportandoPdf = false;
    this.textoBtnExpPdf = 'Exportar a PDF';

  }

  public onEnviarCorreo():void {
    this.enviandoCorreo = true;
    let pdf = this.crearPdf();
    this.envioPdfService.enviarPdf(this.formEnvioCorreo.value.correo,pdf.output("datauristring"),'Planificacion de cursos','Reporte de planificacion de cursos','Planificacion.pdf')
      .subscribe((res:IServerResponse)=>{
        if(res.status == 200){
          console.log(res);
        } else {
          console.error(res);
        }
        this.enviandoCorreo = false;
      }, error => {
        console.error(error);
        this.enviandoCorreo = false;
      });
    this.modalService.dismissAll();
  }

  public openModalEnvioCorreo(content):void {

    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });

  }

  private crearPdf(){

    let pdf = new jsPDF();
    let posX = 15, posY = 15;
    //let o = new myPDF();
    pdf.setFontSize(20);
    pdf.fromHTML(`<h1>UNIVERSIDAD MARIANO GALVEZ</h1>`,posX,posY);
    pdf.setFontSize(17);

    posY += 10;
    pdf.fromHTML(`<h2>Centro Universitario de Quetzaltenango</h2>`,posX,posY);

    posY += 15;
    pdf.fromHTML(`<h2>${this.carrera.codigo_carrera}/${this.filtro.ano_pensum}</h2>`,posX,posY);

    posY+= 6;
    pdf.fromHTML(`<h2>Ingeniería en Sistemas</h2>`,posX,posY);

    pdf.setFontSize(15);
    posY += 7;
    pdf.fromHTML(`<h3>${this.jornada.nombre_jornada}</h3>`,posX,posY);

    posY += 5;
    pdf.fromHTML(`<h4>A&ntilde;o de Pensum ${this.filtro.ano_pensum}</h4>`,posX,posY);


    pdf.setFontSize(15);
    posY += 10;
    pdf.fromHTML(`<h3>Programaci&oacute;n de cursos</h3>`,posX,posY);

    pdf.setFontSize(15);
    posY += 6;
    pdf.fromHTML(`<h4>A&ntilde;o:&nbsp;${this.filtro.ano}</h4>`,posX,posY);

    pdf.fromHTML(`<h4>Ciclo:&nbsp;${this.filtro.no_semestre}</h4>`,posX+25,posY);

    //posY += 7;
    pdf.fromHTML(`<h4>Secci&oacute;n:&nbsp;${this.filtro.seccion}</h4>`,posX+45,posY);

    posY += 8;
    //let p2 = new myPDF();
    pdf.setFontSize(10);
    pdf.autoTable({
      html:'#tabla-reporte', // id de la tabla
      theme:'grid',
      startY: posY,
      styles: {
        lineColor: [3,3,3],
        textColor: [5,5,5],
        valign: 'middle',
        //halign: 'center'
      }/*,
        headStyles: {
          fillColor: null,
          lineColor: [3,3,3],
          //lineWidth: 1
        }*/
    });

    return pdf;

  }

  public cargarAsignaciones():void {

    this.asigService.listAsignaciones(this.filtro)
      .subscribe((res:IServerResponse)=>{

        this.asignaciones = groupBy(res.data,'dia');
        this.dias = Object.keys(this.asignaciones).sort((dia1,dia2)=>this.PosicionDia[dia1]-this.PosicionDia[dia2]);

        this.cargandoPlanificacion = false;
        this.textoBtnVerPlanificacion = 'Ver planificacion';

      }, (error:any)=>{
        this.cargandoPlanificacion = false;
        this.textoBtnVerPlanificacion = 'Ver planificacion';
        console.error(error);
      });

  }

  public onCambioCarrera():void {
    this.cargarPensums();
    this.cargarJornadas();
  }

  public cargarPensums():void {
    this.pensumService.listPensums(this.formFiltro.value.za_carrera)
      .subscribe((res:IServerResponse)=>{
        if(res.status == 200){
          this.pensums = res.data;
        } else {
          console.error(res);
        }
      }, error => console.error(error));
  }

  public cargarJornadas():void {

    this.jornadasService.listJornadas(this.formFiltro.value.za_carrera)
      .subscribe((res:IServerResponse)=>{
        if(res.status == 200){
          this.jornadas = res.data;
        } else {
          console.error(res);
        }
      }, error => console.error(error));

  }

}
