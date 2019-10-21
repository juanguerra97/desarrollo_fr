import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ICatedratico} from '../models/icatedratico.model';
import {Observable} from 'rxjs';
import {IServerResponse} from '../models/iserverresponse.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvioPdfService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}enviarpdf`;

  constructor(private http: HttpClient) { }

  public enviarPdf(correo:string,pdf:string,asunto:string,texto:string,nombrepdf:string): Observable<IServerResponse> {
    const url = `${this.urlComponente}`;
    return this.http.post<IServerResponse>(url, {correo,pdf,asunto,texto,nombrepdf});
  }

}
