
import { IDia } from './idia.model'
import {ICatedratico} from './icatedratico.model';
import {ICurso} from './icurso.model';

export interface IAsignacion {

  za_carrera: number;
  ano_pensum: number;
  za_jornada: number;
  ano: number;
  no_semestre: number;
  seccion: string;
  za_curso: number;
  nombre_curso?: string;
  za_profesor:number;
  nombres?:string;
  apellidos?: string;
  za_dia: number;
  dia?: string;
  hora_inicio: string;
  hora_fin: string;

}
