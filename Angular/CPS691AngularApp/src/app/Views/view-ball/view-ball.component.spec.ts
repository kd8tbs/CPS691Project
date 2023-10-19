import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBallComponent } from './view-ball.component';

describe('ViewBallComponent', () => {
  let component: ViewBallComponent;
  let fixture: ComponentFixture<ViewBallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBallComponent]
    });
    fixture = TestBed.createComponent(ViewBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
