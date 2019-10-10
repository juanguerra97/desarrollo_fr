import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IServerResponse} from '../models/iserverresponse.model';
import {Observable} from 'rxjs';
import {IPensum} from '../models/ipensum';

@Injectable({
  providedIn: 'root'
})
export class PensumService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/pensums`;


  constructor(private http: HttpClient) { }

  public listPensums(za_carrera:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}`;
    return this.http.get<IServerResponse>(url);
  }

  public selectPensum(za_carrera:number, ano_pensum:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${ano_pensum}`;
    return this.http.get<IServerResponse>(url);
  }

  public crearPensum(pensum:IPensum): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, pensum);
  }

  public editarPensum(za_carrera:number,ano_pensum:number,datos:IPensum): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${ano_pensum}`;
    return this.http.put<IServerResponse>(url, datos);
  }

  public eliminarPensum(za_carrera:number,ano_pensum:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${ano_pensum}`;
    return this.http.delete<IServerResponse>(url);
  }

}
