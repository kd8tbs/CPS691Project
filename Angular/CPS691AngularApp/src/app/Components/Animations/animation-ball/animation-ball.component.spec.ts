import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationBallComponent } from './animation-ball.component';

describe('AnimationBallComponent', () => {
  let component: AnimationBallComponent;
  let fixture: ComponentFixture<AnimationBallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimationBallComponent]
    });
    fixture = TestBed.createComponent(AnimationBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
