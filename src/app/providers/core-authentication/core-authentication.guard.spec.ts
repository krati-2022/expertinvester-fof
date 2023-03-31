import { TestBed } from '@angular/core/testing';

import { CoreAuthenticationGuard } from './core-authentication.guard';

describe('CoreAuthenticationGuard', () => {
  let guard: CoreAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoreAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
