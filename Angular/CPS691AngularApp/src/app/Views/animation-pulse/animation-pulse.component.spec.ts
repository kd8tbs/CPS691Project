import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationPulseComponent } from './animation-pulse.component';

describe('AnimationPulseComponent', () => {
  let component: AnimationPulseComponent;
  let fixture: ComponentFixture<AnimationPulseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimationPulseComponent]
    });
    fixture = TestBed.createComponent(AnimationPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
