import { TestBed } from '@angular/core/testing';

import { AsigService } from './asig.service';

describe('AsigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsigService = TestBed.get(AsigService);
    expect(service).toBeTruthy();
  });
});
