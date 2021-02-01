import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSyncComponent } from './api-sync.component';

describe('ApiSyncComponent', () => {
  let component: ApiSyncComponent;
  let fixture: ComponentFixture<ApiSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
