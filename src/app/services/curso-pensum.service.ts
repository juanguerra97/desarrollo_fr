import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IServerResponse} from '../models/iserverresponse.model';
import {Observable} from 'rxjs';

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
}
