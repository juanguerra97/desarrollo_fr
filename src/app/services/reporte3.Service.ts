import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URLS } from '../serverurls';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Reporte3Service {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}reportes/reporte3`;

  constructor( private http: HttpClient ) {}

  listReporte3() {
    return this.http.get(`${this.urlApi}reportes/reporte3`);
  }
}
