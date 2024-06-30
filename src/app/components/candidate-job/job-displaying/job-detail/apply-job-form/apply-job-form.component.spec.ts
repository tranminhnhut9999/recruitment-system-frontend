import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobFormComponent } from './apply-job-form.component';

describe('ApplyJobFormComponent', () => {
  let component: ApplyJobFormComponent;
  let fixture: ComponentFixture<ApplyJobFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyJobFormComponent]
    });
    fixture = TestBed.createComponent(ApplyJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
