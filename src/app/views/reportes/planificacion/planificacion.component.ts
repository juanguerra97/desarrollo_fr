import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ISeccion} from '../../../models/iseccion.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarrerasService} from '../../../../services/carreras.service';
import {JornadasService} from '../../../services/jornadas.service';
import {AsigService} from '../../../services/asig.service';
import {IServerResponse} from '../../../models/iserverresponse.model';
import { groupBy }  from 'lodash';
 import * as myPDF from 'jspdf';
import {PensumService} from '../../../services/pensum.service';
// import 'jspdf-autotable';
// import html2canvas from 'html2canvas';

// import 'jspdf';
// import 'jspdf-autotable';
// declare let jsPDF;

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
  public carreras:any[]=[];
  public pensums:any[]=[];
  public jornadas:any[]=[];
  public carrera:any;
  public jornada:any;

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



  constructor(
    private carrerasService: CarrerasService,
    private pensumService: PensumService,
    private jornadasService: JornadasService,
    private asigService: AsigService,
  ) { }

  ngOnInit() {
    this.carrerasService.listCarreras().subscribe((datos:any)=>this.carreras=datos);
  }

  public onFiltrar():void {

    this.filtro = this.formFiltro.value;

    this.carrera = this.carreras[this.carreras.findIndex(carr=>carr.za_carrera == this.filtro.za_carrera)];
    this.jornada = this.jornadas[this.jornadas.findIndex(jor => jor.za_carrera == this.filtro.za_carrera && jor.za_jornada == this.filtro.za_jornada)];

    this.cargarAsignaciones();

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
        theme:'grid'
      });
      pdf.save('planificacion.pdf');

  }

  public cargarAsignaciones():void {

    this.asigService.listAsignaciones(this.filtro)
      .subscribe((res:IServerResponse)=>{

        this.asignaciones = groupBy(res.data,'dia');
        this.dias = Object.keys(this.asignaciones).sort((dia1,dia2)=>this.PosicionDia[dia1]-this.PosicionDia[dia2]);

      });

  }

  public onCambioCarrera():void {
    this.cargarPensums();
    this.cargarJornadas();
  }

  public cargarPensums():void {
    this.pensumService.listPensums(this.formFiltro.value.za_carrera)
      .subscribe((res:any)=>this.pensums = res);
  }

  public cargarJornadas():void {

    this.jornadasService.listJornadas(this.formFiltro.value.za_carrera)
      .subscribe((res:any)=>this.jornadas = res);

  }

}
