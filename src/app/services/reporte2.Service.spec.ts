import { TestBed } from '@angular/core/testing';
import { reporte2Interface } from '../views/interfaces/reporte2-interface';
import { Reporte2Service } from './reporte2.Service';

describe('Reporte2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Reporte2Service = TestBed.get(Reporte2Service);
    expect(service).toBeTruthy();
  });
});
