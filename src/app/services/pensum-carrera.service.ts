import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PensumCarreraService {

  private urlApi = environment.apiURL;
  private urlComponente = `${this.urlApi}cruds/pensums/`;


  constructor(private http: HttpClient) {
  }

  listPensums(carrera, pensum, curso) {
    const url = `${this.urlComponente}${carrera}/${pensum}/${curso}`;
    return this.http.get(url);
  }

  crearPensum(pensum) {
    const url = `${this.urlComponente}`;
    return this.http.post(url, pensum);
  }
}
