import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IJornada} from '../models/ijornada';
import {IServerResponse} from '../models/iserverresponse.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JornadasService {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/jornadas`;

  constructor(private http: HttpClient) { }

  public crearJornada(jornada: IJornada): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, jornada);
  }

  public listJornadas(za_carrera:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}`;
    return this.http.get<IServerResponse>(url);
  }

  public selectJornada(za_carrera:number, za_jornada:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${za_jornada}`;
    return this.http.get<IServerResponse>(url);
  }

  public editarJornada(za_carrera:number, za_jornada:number, datos:IJornada): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${za_jornada}`;
    return this.http.put<IServerResponse>(url,datos);
  }

  public eliminarJornada(za_carrera:number, za_jornada:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${za_jornada}`;
    return this.http.delete<IServerResponse>(url);
  }

}
