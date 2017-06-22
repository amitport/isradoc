import { TestBed, inject } from '@angular/core/testing';

import { isLoading } from './loading-indicator.service';

describe('LoadingIndicator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [isLoading]
    });
  });

  it('should be created', inject([isLoading], (service: isLoading) => {
    expect(service).toBeTruthy();
  }));
});
