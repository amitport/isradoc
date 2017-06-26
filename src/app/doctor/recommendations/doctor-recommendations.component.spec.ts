import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRecommendationsComponent } from './doctor-recommendations.component';

describe('DoctorRecommendationsComponent', () => {
  let component: DoctorRecommendationsComponent;
  let fixture: ComponentFixture<DoctorRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
