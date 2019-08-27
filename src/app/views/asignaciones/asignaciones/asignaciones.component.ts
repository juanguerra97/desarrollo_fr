import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {IAsignacion} from '../../../models/iasignacion.model';
import {ISeccion} from '../../../models/iseccion.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalConfirmacionService} from '../../../services/modal-confirmacion.service';
import {CarrerasService} from '../../../../services/carreras.service';
import {AsigService} from '../../../services/asig.service';
import {DiasJornadaService} from '../../../services/dias-jornada.service';
import {JornadasService} from '../../../services/jornadas.service';
import {CatedraticosService} from '../../../services/catedraticos.service';
import {CursosService} from '../../../services/cursos.service';
import {IServerResponse} from '../../../models/iserverresponse.model';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {

  public filtro:ISeccion=null; // seccion a la que deberán pertenecer las asignaciones
  public asignaciones:IAsignacion[]=[];
  public asignacionSeleccionada = null;// asignacion seleccionada en la lista, con un click se selecciona y volviendo a hacer click se deselecciona


  private carreras:any[]=[];
  private jornadas:any[]=[];
  private dias:any[]=[];
  private catedraticos:any[]=[];
  private cursos:any[]=[];

  private TimeRegex:RegExp = /^([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/g;

  // formulario para la seccion a filtrar
  private formFiltro = new FormGroup({
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

  // formulario para editar o ingresar una nueva asignacion
  private formAsignacion = new FormGroup({
    za_curso: new FormControl('0',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    za_profesor: new FormControl('0',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    za_dia: new FormControl('0',[
      Validators.required,
      Validators.pattern('[0-9]+')
    ]),
    hora_inicio: new FormControl('',[
      Validators.required, //Validators.pattern('([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9]))?')
      Validators.pattern('([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?')
    ]),
    hora_fin: new FormControl('',[
      Validators.required, //Validators.pattern('([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9]))?')
      Validators.pattern('([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?')
    ]),
  });

  constructor(
    private carrerasService: CarrerasService,
    private jornadasService: JornadasService,
    private diasService:DiasJornadaService,
    private catedraticosService:CatedraticosService,
    private cursosService:CursosService,
    private asigService: AsigService,
    private modalService: NgbModal, private modalConfirmacion:ModalConfirmacionService
  ) { }

  ngOnInit() {
    this.carrerasService.listCarreras().subscribe((datos:any)=>this.carreras=datos);
    this.cursosService.listCursos().subscribe((datos:any)=>this.cursos=datos);
    this.catedraticosService.listCatedraticos().subscribe((datos:any)=>this.catedraticos=datos);
  }

  private guardarNueva(): void{

    console.log("Inicio: "+this.strToTime(this.formAsignacion.value.hora_inicio));
    console.log("Fin: "+this.strToTime(this.formAsignacion.value.hora_fin));

    let nuevaAsignacion: IAsignacion = {
      za_carrera: this.filtro.za_carrera,
      ano_pensum: this.filtro.ano_pensum,
      za_jornada: this.filtro.za_jornada,
      ano: this.filtro.ano,
      no_semestre: this.filtro.no_semestre,
      seccion: this.filtro.seccion,
      za_curso: this.formAsignacion.value.za_curso,
      za_profesor: this.formAsignacion.value.za_profesor,
      za_dia: this.formAsignacion.value.za_dia,
      hora_inicio: this.strToTime(this.formAsignacion.value.hora_inicio),
      hora_fin: this.strToTime(this.formAsignacion.value.hora_fin),
    };

    this.asigService.crearAsignacion(nuevaAsignacion).subscribe((res:IServerResponse)=>{
      if(res.status == 200){ // OK
        this.cargarAsignaciones();
      }else{// Error
        console.error(res);
      }
      this.modalService.dismissAll();
    });

    this.formAsignacion.reset();
  }

  private guardarEdicion():void{

    let actualizacion:IAsignacion = {
      za_carrera: this.asignacionSeleccionada.za_carrera,
      ano_pensum: this.asignacionSeleccionada.ano_pensum,
      za_jornada: this.asignacionSeleccionada.za_jornada,
      ano: this.asignacionSeleccionada.ano,
      no_semestre: this.asignacionSeleccionada.no_semestre,
      seccion: this.asignacionSeleccionada.seccion,
      za_curso: this.formAsignacion.value.za_curso,
      za_profesor: this.formAsignacion.value.za_profesor,
      za_dia: this.formAsignacion.value.za_dia,
      hora_inicio: this.strToTime(this.formAsignacion.value.hora_inicio),
      hora_fin: this.strToTime(this.formAsignacion.value.hora_fin),
    };

    this.asigService.actualizarAsignacion(this.asignacionSeleccionada,actualizacion)
      .subscribe((res:IServerResponse)=>{

        if(res.status == 200){ // actualizacion con exito
          this.cargarAsignaciones();
        }else { // hubo un error con la actualizacion
          console.error(res);
        }
        this.modalService.dismissAll();

      })

  }

  // muestra modal para pedir confirmacion de la asignacion seleccionada
  private eliminar():void {

    this.modalConfirmacion.mostrar(
      'Eliminar Asignacion',
      '¿Está seguro que quiere eliminar la asignacion?')
      .then(result => {

        if(result ==  true){
          this.asigService.eliminarAsignacion(this.asignacionSeleccionada)
            .subscribe((res:IServerResponse)=>{

            if(res.status == 200){ // OK
              this.cargarAsignaciones();
            }else{ // Error
              console.error(res);
            }

          });
        }

      })
      .catch(dismiss=>console.log(dismiss));

  }

  // metodo que se ejecuta cada vez que se selecciona o deselecciona una asignacion de la lista
  private onAsignacionClicked(asignacion:IAsignacion):void {
    if(asignacion == this.asignacionSeleccionada){
      this.asignacionSeleccionada = null;
    }else{
      this.asignacionSeleccionada = asignacion;
    }
  }

  // abre el modal par editar o ingresar nueva asignacion
  private openModal(content):void {

    if(this.asignacionSeleccionada != null){ // Edicion

      // se cargan los valores de la asignacion seleccionada en el formulario
      this.formAsignacion.setValue({
        za_curso: this.asignacionSeleccionada.za_curso,
        za_profesor: this.asignacionSeleccionada.za_profesor,
        za_dia: this.asignacionSeleccionada.za_dia,
        hora_inicio: this.asignacionSeleccionada.hora_inicio,
        hora_fin: this.asignacionSeleccionada.hora_fin
      });

    }else{// Nueva
      this.formAsignacion.reset();
    }

    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      windowClass: 'animated bounceIn'
    });

  }

  private onFiltrar():void {

    this.filtro = this.formFiltro.value;

    // se cargan los dias de la carrera y jornada a filtrar
    this.cargarDias();

    this.cargarAsignaciones();

  }

  private cargarAsignaciones():void {

    this.asigService.listAsignaciones(this.filtro)
      .subscribe((res:IServerResponse)=>{

        this.asignacionSeleccionada = null;
        this.asignaciones = res.data

      });

  }

  private cargarJornadas():void {

    this.jornadasService.listJornadas(this.formFiltro.value.za_carrera)
      .subscribe((res:any)=>this.jornadas = res);

  }

  private cargarDias():void {

    this.diasService.listDias(this.filtro.za_carrera,this.filtro.za_jornada)
      .subscribe((res:any)=>this.dias=res);

  }

  private strToTime(strTime):string {

    let regex = /^([0-1]?[0-9]|2[0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/g;
    let match=Array.from(strTime.matchAll(regex));

    let time = match[0][1];

    if(match[0][3]){
      time += ":" + match[0][3];
    }else{
      time += ":00";
    }

    if(match[0][5]){
      time += ":" + match[0][5];
    }else{
      time += ":00";
    }

    return time;
  }


}
