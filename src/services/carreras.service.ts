import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CarreraInterface} from '../app/views/interfaces/carreraInterface';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/carreras/`;
  constructor(private http: HttpClient) { }

  crearCarrera(carrera: CarreraInterface) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, carrera);
  }

  listCarreras() {
    const url = `${this.urlComponente}`;
    return this.http.get<String>(url);
  }

  eliminarCarrera(carrera: CarreraInterface) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, carrera);
  }
}
