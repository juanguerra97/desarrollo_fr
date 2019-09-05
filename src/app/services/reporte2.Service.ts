import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { reporte2Interface } from '../views/interfaces/reporte2-interface';
@Injectable({
  providedIn: 'root'
})
export class Reporte2Service {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}reportes/reporte2/`;

  public selreporte2 : reporte2Interface={
    Codigo_catedratico: null,
    anio: null,
    no_semestre:null
  }

  constructor( private http: HttpClient ) {}

  public buscarreporte2(filtro){
    let url = `${this.urlComponente}${filtro.Codigo_catedratico}/${filtro.anio}/${filtro.no_semestre}`;

    return this.http.get(url);
  }

}
