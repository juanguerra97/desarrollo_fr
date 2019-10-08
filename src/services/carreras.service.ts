import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IServerResponse} from '../app/models/iserverresponse.model';
import {ICarrera} from '../app/models/icarrera.model';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/carreras/`;

  constructor(private http: HttpClient) { }

  public crearCarrera(carrera: ICarrera):Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, carrera);
  }

  public listCarreras(): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.get<IServerResponse>(url);
  }

  public selectCarrera(za_carrera:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}${za_carrera}`;
    return this.http.get<IServerResponse>(url);
  }

  public editarCarrera(za_carrera:number, datos:ICarrera): Observable<IServerResponse> {
    const url = `${this.urlComponente}${za_carrera}`;
    return this.http.put<IServerResponse>(url,datos);
  }

  public eliminarCarrera(za_carrera:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}${za_carrera}`;
    return this.http.delete<IServerResponse>(url);
  }
}
