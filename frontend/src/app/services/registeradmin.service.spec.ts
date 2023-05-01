import { TestBed } from '@angular/core/testing';

import { RegisteradminService } from './registeradmin.service';

describe('RegisteradminService', () => {
  let service: RegisteradminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteradminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
