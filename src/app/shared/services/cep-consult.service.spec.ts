import { TestBed } from '@angular/core/testing';

import { CepConsultService } from './cep-consult.service';

describe('CepConsultService', () => {
  let service: CepConsultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepConsultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
