import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLinksComponent } from './doctor-links.component';

describe('DoctorLinksComponent', () => {
  let component: DoctorLinksComponent;
  let fixture: ComponentFixture<DoctorLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
