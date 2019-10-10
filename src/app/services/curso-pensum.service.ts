import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IServerResponse} from '../models/iserverresponse.model';
import {Observable} from 'rxjs';
import {ICursoPensum} from '../models/icursopensum';

@Injectable({
  providedIn: 'root'
})
export class CursoPensumService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/cursosPensums`;

  constructor( private http: HttpClient ) {}

  public listCursos(za_carrera:number, ano_pensum:number, ciclo:number):Observable<IServerResponse> {
    const url = `${this.urlComponente}?za_carrera=${za_carrera}&ano_pensum=${ano_pensum}&ciclo=${ciclo}`;
    return this.http.get<IServerResponse>(url);
  }

  public listPensumsCursos(za_carrera:number, ano_pensum:number):Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${ano_pensum}`;
    return this.http.get<IServerResponse>(url);
  }

  public crearCursoPensum(cursopensum:ICursoPensum): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, cursopensum);
  }

  public editarCursoPensum(za_carrera:number,ano_pensum:number,za_curso:number,datos:ICursoPensum): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${ano_pensum}/${za_curso}`;
    return this.http.put<IServerResponse>(url,datos);
  }

  public eliminarCursoPensum(za_carrera:number,ano_pensum:number,za_curso:number): Observable<IServerResponse> {
    const url = `${this.urlComponente}/${za_carrera}/${ano_pensum}/${za_curso}`;
    return this.http.delete<IServerResponse>(url);
  }

}
