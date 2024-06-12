import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDisplayingComponent } from './job-displaying.component';

describe('JobDisplayingComponent', () => {
  let component: JobDisplayingComponent;
  let fixture: ComponentFixture<JobDisplayingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobDisplayingComponent]
    });
    fixture = TestBed.createComponent(JobDisplayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
