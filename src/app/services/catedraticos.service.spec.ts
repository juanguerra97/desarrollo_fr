import { TestBed } from '@angular/core/testing';

import { CatedraticosService } from './catedraticos.service';

describe('CatedraticosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatedraticosService = TestBed.get(CatedraticosService);
    expect(service).toBeTruthy();
  });
});
