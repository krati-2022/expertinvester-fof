import { TestBed } from '@angular/core/testing';

import { CoreInterceptorService } from './core-interceptor.service';

describe('CoreInterceptorService', () => {
  let service: CoreInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
