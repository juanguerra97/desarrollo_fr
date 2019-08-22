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

  crearDia(carrera) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, carrera);
  }

  listDias(carrera) {
    const url = `${this.urlComponente}/${carrera}`;
    return this.http.get(url);
  }

}
