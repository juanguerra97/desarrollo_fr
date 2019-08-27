import { TestBed } from '@angular/core/testing';

import { PensumCarreraService } from './pensum-carrera.service';

describe('PensumCarreraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PensumCarreraService = TestBed.get(PensumCarreraService);
    expect(service).toBeTruthy();
  });
});
