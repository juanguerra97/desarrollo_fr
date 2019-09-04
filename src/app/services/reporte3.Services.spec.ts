import { TestBed } from '@angular/core/testing';

import { Reporte3Service } from './reporte3.Service';

describe('Reporte3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Reporte3Service = TestBed.get(Reporte3Service);
    expect(service).toBeTruthy();
  });
});
