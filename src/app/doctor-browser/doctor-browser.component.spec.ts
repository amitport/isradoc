import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBrowserComponent } from './doctor-browser.component';

describe('DoctorBrowserComponent', () => {
  let component: DoctorBrowserComponent;
  let fixture: ComponentFixture<DoctorBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
