import { TestBed, async, inject } from '@angular/core/testing';

import { DoctorListResolver } from './doctor-list-resolver.guard';

describe('DoctorListResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorListResolver]
    });
  });

  it('should ...', inject([DoctorListResolver], (guard: DoctorListResolver) => {
    expect(guard).toBeTruthy();
  }));
});
