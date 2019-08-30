import { Component, OnInit } from '@angular/core';
import {ISeccion} from '../../../models/iseccion.model';
import {IAsignacion} from '../../../models/iasignacion.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarrerasService} from '../../../../services/carreras.service';
import {JornadasService} from '../../../services/jornadas.service';
import {AsigService} from '../../../services/asig.service';
import {IServerResponse} from '../../../models/iserverresponse.model';
import { groupBy }  from 'lodash';

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
  public jornadas:any[]=[];

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
    private jornadasService: JornadasService,
    private asigService: AsigService,
  ) { }

  ngOnInit() {
    this.carrerasService.listCarreras().subscribe((datos:any)=>this.carreras=datos);
  }

  public onFiltrar():void {

    this.filtro = this.formFiltro.value;

    this.cargarAsignaciones();

  }

  public cargarAsignaciones():void {

    this.asigService.listAsignaciones(this.filtro)
      .subscribe((res:IServerResponse)=>{

        this.asignaciones = groupBy(res.data,'dia');
        this.dias = Object.keys(this.asignaciones);

      });

  }

  public cargarJornadas():void {

    this.jornadasService.listJornadas(this.formFiltro.value.za_carrera)
      .subscribe((res:any)=>this.jornadas = res);

  }

}
