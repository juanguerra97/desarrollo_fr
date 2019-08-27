import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ISeccion} from '../models/iseccion.model';
import {IAsignacion} from '../models/iasignacion.model';
import {Observable} from 'rxjs';
import {IServerResponse} from '../models/iserverresponse.model';

@Injectable({
  providedIn: 'root'
})
export class AsigService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/asignaciones`;

  constructor(private http: HttpClient) { }

  public crearAsignacion(asignacion:IAsignacion):Observable<IServerResponse> {
    const url = this.urlComponente;
    return this.http.post<IServerResponse>(url,asignacion);
  }

  public listAsignaciones(seccion:ISeccion):Observable<IServerResponse> {
    const url = `${this.urlComponente}?za_carrera=${seccion.za_carrera}&ano_pensum=${seccion.ano_pensum}&za_jornada=${seccion.za_jornada}&ano=${seccion.ano}&no_semestre=${seccion.no_semestre}&seccion=${seccion.seccion}` ;
    return this.http.get<IServerResponse>(url);
  }

  public eliminarAsignacion(asignacion:IAsignacion):Observable<IServerResponse> {
    const url = this.urlComponente;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: asignacion
    };
    return this.http.delete<IServerResponse>(url,httpOptions);
  }

  public actualizarAsignacion(oldAsig:IAsignacion,updAsig:IAsignacion):Observable<IServerResponse> {
    const url = this.urlComponente;
    return this.http.put<IServerResponse>(url,{old:oldAsig,update:updAsig});
  }

}
