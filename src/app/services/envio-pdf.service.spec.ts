import { TestBed } from '@angular/core/testing';

import { EnvioPdfService } from './envio-pdf.service';

describe('EnvioPdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvioPdfService = TestBed.get(EnvioPdfService);
    expect(service).toBeTruthy();
  });
});
