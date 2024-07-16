import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeConfigurationComponent } from './job-type-configuration.component';

describe('JobTypeConfigurationComponent', () => {
  let component: JobTypeConfigurationComponent;
  let fixture: ComponentFixture<JobTypeConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTypeConfigurationComponent]
    });
    fixture = TestBed.createComponent(JobTypeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
