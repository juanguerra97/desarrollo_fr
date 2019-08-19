import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}/carreras`;
  constructor(private http: HttpClient) { }

  crearCarrera(carrera) {
    const url = `${this.urlComponente}`;
    return this.http.put(url, carrera);
  }
}
