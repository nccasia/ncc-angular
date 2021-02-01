import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectIncreaseFistComponent } from './subject-increase-fist.component';

describe('SubjectIncreaseFistComponent', () => {
  let component: SubjectIncreaseFistComponent;
  let fixture: ComponentFixture<SubjectIncreaseFistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectIncreaseFistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectIncreaseFistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
