import { Injectable } from '@angular/core';
import { ICurso } from '../models/icurso.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_URLS } from '../serverurls';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos:ICurso[];

  constructor( 
    private http:HttpClient 
  ) {
    this.http.get<ICurso[]>(SERVER_URLS['GET_ALL_CURSOS'])
      .subscribe((cursos: ICurso[]) => {
        this.cursos = cursos
      });
  }


  getAll(){
    return this.cursos;
  }

  getByCodigo(codigoCurso:number){
    
  }

  insert(nuevoCurso:ICurso) {
    this.cursos.push(nuevoCurso);
  }

  delete(curso:ICurso){

  }

  update(oldCurso:ICurso,newCurso:ICurso){

  }

}
