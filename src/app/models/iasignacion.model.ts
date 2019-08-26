
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
  curso: ICurso;
  catedratico: ICatedratico;
  dia:IDia;
  hora_inicio: string;
  hora_fin: string;

}
