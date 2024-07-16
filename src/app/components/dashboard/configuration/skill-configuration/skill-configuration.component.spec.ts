import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillConfigurationComponent } from './skill-configuration.component';

describe('SkillConfigurationComponent', () => {
  let component: SkillConfigurationComponent;
  let fixture: ComponentFixture<SkillConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillConfigurationComponent]
    });
    fixture = TestBed.createComponent(SkillConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
