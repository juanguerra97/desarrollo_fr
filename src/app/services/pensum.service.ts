import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CarreraInterface} from '../views/interfaces/carreraInterface';

@Injectable({
  providedIn: 'root'
})
export class PensumService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/pensums/`;


  constructor(private http: HttpClient) { }

  listPensums() {
    const url = `${this.urlComponente}`;
    return this.http.get(url);
  }

  crearPensum(pensum) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, pensum);
  }
}
