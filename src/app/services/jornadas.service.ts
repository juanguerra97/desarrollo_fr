import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CarreraInterface} from '../views/interfaces/carreraInterface';
import {JornadaInterface} from '../views/interfaces/jornada-interface';

@Injectable({
  providedIn: 'root'
})
export class JornadasService {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}/cruds/jornadas`;
  constructor(private http: HttpClient) { }

  crearJornada(carrera: JornadaInterface) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, carrera).subscribe(res => {alert(res); });
  }
}
