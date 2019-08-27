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

  public listAsignaciones(filtro:any):Observable<IServerResponse> {
    let url = `${this.urlComponente}?`;
    if(filtro != undefined){
      if(filtro.za_carrera != undefined){
          url += `za_carrera=${filtro.za_carrera}&`;
      }
      if(filtro.ano_pensum != undefined){
        url += `ano_pensum=${filtro.ano_pensum}&`;
      }
      if(filtro.za_jornada != undefined){
        url += `za_jornada=${filtro.za_jornada}&`;
      }
      if(filtro.ano != undefined){
        url += `ano=${filtro.ano}&`;
      }
      if(filtro.no_semestre != undefined){
        url += `no_semestre=${filtro.no_semestre}&`;
      }
      if(filtro.seccion != undefined){
        url += `seccion=${filtro.seccion}`;
      }
    }
      // `za_carrera=${filtro.za_carrera}&ano_pensum=${filtro.ano_pensum}&za_jornada=${filtro.za_jornada}&ano=${filtro.ano}&no_semestre=${filtro.no_semestre}&seccion=${filtro.seccion}` ;
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
