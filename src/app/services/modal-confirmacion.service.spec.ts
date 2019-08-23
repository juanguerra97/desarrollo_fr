import { TestBed } from '@angular/core/testing';

import { ModalConfirmacionService } from './modal-confirmacion.service';

describe('ModalConfirmacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalConfirmacionService = TestBed.get(ModalConfirmacionService);
    expect(service).toBeTruthy();
  });
});
