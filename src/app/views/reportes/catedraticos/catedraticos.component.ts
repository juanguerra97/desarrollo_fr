import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Reporte2Service} from '../../../services/reporte2.Service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-catedraticos',
  templateUrl: './catedraticos.component.html',
  styleUrls: ['./catedraticos.component.scss']
})
export class CatedraticosComponent implements OnInit {
  public conexiones;

  constructor(private reporte2Service: Reporte2Service,
              private location: Location
  ){
  }

  ngOnInit() {

  }
  OnEnviar(reporteForm: NgForm ){
    this.reporte2Service.buscarreporte2(reporteForm.value).subscribe((res)=> {this.conexiones = res, console.log(res)});

  }

}
