import { TestBed } from '@angular/core/testing';

import { JornadasService } from './jornadas.service';

describe('JornadasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JornadasService = TestBed.get(JornadasService);
    expect(service).toBeTruthy();
  });
});
