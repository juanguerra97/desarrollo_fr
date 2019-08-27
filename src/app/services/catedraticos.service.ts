import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatedraticosService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}cruds/catedraticos/`;

  constructor(private http: HttpClient) { }

  listCatedraticos() {
    const url = `${this.urlComponente}`;
    return this.http.get(url);
  }

  crearCatedratico(pensum) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, pensum);
  }
}
