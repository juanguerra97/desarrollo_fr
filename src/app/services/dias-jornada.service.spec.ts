import { TestBed } from '@angular/core/testing';

import { DiasJornadaService } from './dias-jornada.service';

describe('DiasJornadaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiasJornadaService = TestBed.get(DiasJornadaService);
    expect(service).toBeTruthy();
  });
});
