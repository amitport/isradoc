import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAboutComponent } from './doctor-about.component';

describe('DoctorAboutComponent', () => {
  let component: DoctorAboutComponent;
  let fixture: ComponentFixture<DoctorAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
