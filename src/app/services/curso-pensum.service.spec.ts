import { TestBed } from '@angular/core/testing';

import { CursoPensumService } from './curso-pensum.service';

describe('CursoPensumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoPensumService = TestBed.get(CursoPensumService);
    expect(service).toBeTruthy();
  });
});
