import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentConfigurationComponent } from './department-configuration.component';

describe('DepartmentConfigurationComponent', () => {
  let component: DepartmentConfigurationComponent;
  let fixture: ComponentFixture<DepartmentConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentConfigurationComponent]
    });
    fixture = TestBed.createComponent(DepartmentConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
