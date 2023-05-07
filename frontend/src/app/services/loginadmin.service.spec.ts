import { TestBed } from '@angular/core/testing';

import { LoginadminService } from './loginadmin.service';

describe('LoginadminService', () => {
  let service: LoginadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
