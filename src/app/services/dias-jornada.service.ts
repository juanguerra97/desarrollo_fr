import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiasJornadaService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/dias`;
  constructor(private http: HttpClient) { }

  crearDia(dia) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, dia);
  }

  listDias(carrera, jornada) {
    const url = `${this.urlComponente}/${carrera}/${jornada}`;
    return this.http.get(url);
  }

}
