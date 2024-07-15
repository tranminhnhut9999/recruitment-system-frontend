import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailApplicationComponent } from './detail-application.component';

describe('DetailApplicationComponent', () => {
  let component: DetailApplicationComponent;
  let fixture: ComponentFixture<DetailApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailApplicationComponent]
    });
    fixture = TestBed.createComponent(DetailApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
