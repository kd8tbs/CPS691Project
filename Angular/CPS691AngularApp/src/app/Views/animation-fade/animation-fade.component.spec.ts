import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationFadeComponent } from './animation-fade.component';

describe('AnimationFadeComponent', () => {
  let component: AnimationFadeComponent;
  let fixture: ComponentFixture<AnimationFadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimationFadeComponent]
    });
    fixture = TestBed.createComponent(AnimationFadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
