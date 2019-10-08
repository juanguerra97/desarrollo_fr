import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URLS } from '../serverurls';
import {environment} from '../../environments/environment';
import {IServerResponse} from '../models/iserverresponse.model';
import {Observable} from 'rxjs';
import {ICurso} from '../models/icurso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/cursos`;

  constructor( private http: HttpClient ) {}

  public crearCurso(curso:ICurso): Observable<IServerResponse>  {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, curso);
  }

  public listCursos(): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.get<IServerResponse>(url);
  }

  public selectCurso(za_curso:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_curso}`;
    return this.http.get<IServerResponse>(url);
  }

  public eliminarCurso(za_curso:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_curso}`;
    return this.http.delete<IServerResponse>(url);
  }

  public editarCurso(za_curso:number, datos:ICurso): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_curso}`;
    return this.http.put<IServerResponse>(url, datos);
  }

}
