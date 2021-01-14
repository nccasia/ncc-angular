import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingModuleComponent } from './routing-module.component';

describe('RoutingModuleComponent', () => {
  let component: RoutingModuleComponent;
  let fixture: ComponentFixture<RoutingModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
