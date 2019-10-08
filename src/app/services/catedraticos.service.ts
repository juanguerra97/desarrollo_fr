import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IServerResponse} from '../models/iserverresponse.model';
import {Observable} from 'rxjs';
import {ICatedratico} from '../models/icatedratico.model';

@Injectable({
  providedIn: 'root'
})
export class CatedraticosService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/catedraticos/`;

  constructor(private http: HttpClient) { }

  public listCatedraticos(): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.get<IServerResponse>(url);
  }

  public selectCatedratico(za_profesor:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}${za_profesor}`;
    return this.http.get<IServerResponse>(url);
  }

  public crearCatedratico(catedratico:ICatedratico): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, catedratico);
  }

  public editarCatedratico(za_profesor:number, datos:ICatedratico): Observable<IServerResponse> {
    const url = `${this.urlComponente}${za_profesor}`;
    return this.http.put<IServerResponse>(url,datos);
  }

  public eliminarCatedratico(za_profesor:number):Observable<IServerResponse> {
    const url = `${this.urlComponente}${za_profesor}`;
    return this.http.delete<IServerResponse>(url);
  }

}
