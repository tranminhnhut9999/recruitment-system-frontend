import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStaffComponent } from './register-staff.component';

describe('RegisterStaffComponent', () => {
  let component: RegisterStaffComponent;
  let fixture: ComponentFixture<RegisterStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterStaffComponent]
    });
    fixture = TestBed.createComponent(RegisterStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
