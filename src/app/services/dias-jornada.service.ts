import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IServerResponse} from '../models/iserverresponse.model';
import {IDia} from '../models/idia.model';

@Injectable({
  providedIn: 'root'
})
export class DiasJornadaService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/diasjornadas`;

  constructor(private http: HttpClient) { }

  public crearDia(dia:IDia): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, dia);
  }

  public listDias(za_carrera:number, za_jornada:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${za_jornada}`;
    return this.http.get<IServerResponse>(url);
  }

  public editarDia(za_carrera:number, za_jornada:number, za_dia:number, datos:IDia): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${za_jornada}/${za_dia}`;
    return this.http.put<IServerResponse>(url,datos);
  }

  public eliminarDia(za_carrera:number, za_jornada:number, za_dia:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${za_jornada}/${za_dia}`;
    return this.http.delete<IServerResponse>(url);
  }

}
