import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentHeaderComponent } from './recruitment-header.component';

describe('RecruitmentHeaderComponent', () => {
  let component: RecruitmentHeaderComponent;
  let fixture: ComponentFixture<RecruitmentHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruitmentHeaderComponent]
    });
    fixture = TestBed.createComponent(RecruitmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
