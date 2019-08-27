import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URLS } from '../serverurls';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/cursos`;

  constructor( private http: HttpClient ) {}

  crearCurso(curso) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, curso);
  }

  listCursos() {
    const url = `${this.urlComponente}`;
    return this.http.get(url);
  }
}
