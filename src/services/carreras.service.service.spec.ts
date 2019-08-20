import { TestBed } from '@angular/core/testing';

import { Carreras.ServiceService } from './carreras.service.service';

describe('Carreras.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Carreras.ServiceService = TestBed.get(Carreras.ServiceService);
    expect(service).toBeTruthy();
  });
});
