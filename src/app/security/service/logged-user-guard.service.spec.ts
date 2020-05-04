import { TestBed } from '@angular/core/testing';

import { LoggedUserGuardService } from './logged-user-guard.service';

describe('LoggedUserGuardService', () => {
  let service: LoggedUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
