import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingAddressComponent } from './working-address.component';

describe('WorkingAddressComponent', () => {
  let component: WorkingAddressComponent;
  let fixture: ComponentFixture<WorkingAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingAddressComponent]
    });
    fixture = TestBed.createComponent(WorkingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
