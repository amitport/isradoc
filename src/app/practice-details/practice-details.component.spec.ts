import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailsComponent } from './practice-details.component';

describe('PracticeDetailsComponent', () => {
  let component: PracticeDetailsComponent;
  let fixture: ComponentFixture<PracticeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
