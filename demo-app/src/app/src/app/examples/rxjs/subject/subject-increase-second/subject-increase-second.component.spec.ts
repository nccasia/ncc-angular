import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectIncreaseSecondComponent } from './subject-increase-second.component';

describe('SubjectIncreaseSecondComponent', () => {
  let component: SubjectIncreaseSecondComponent;
  let fixture: ComponentFixture<SubjectIncreaseSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectIncreaseSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectIncreaseSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
