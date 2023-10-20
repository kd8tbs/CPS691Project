import { Component, Input, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.css'],
  animations: [
    trigger('ballAnimation', [
      state('up', style({ transform: 'translateY(0)' })),
      state('down', style({ transform: 'translateY(100%)' })),
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(100%)' })),
      transition('* => *', animate('1s linear')),
    ]),
  ],
})
export class BallComponent {
  animationState = 'up';

  private direction$: Observable<string>;
  private directionSubscription: Subscription;

  ngOnInit() {
    // Start with a random direction
    this.animationState = this.getRandomDirection();

    // Create an observable that emits directions every second
    this.direction$ = new Observable<string>((observer) => {
      const intervalId = setInterval(() => {
        observer.next(this.animationState);
      }, 1000);

      // Stop the interval when the component is destroyed
      return () => clearInterval(intervalId);
    });

    // Subscribe to the observable to change the animation state
    this.directionSubscription = this.direction$.subscribe((direction) => {
      if (!this.isAtEdge()) {
        console.log(direction)
        this.animationState = direction;
      }else{
        this.animationState = this.getRandomDirection();
      }
    });
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    this.directionSubscription.unsubscribe();
  }

  private isAtEdge(): boolean {
    // Check if the ball is at the screen edge
    const ballElement = document.querySelector('.ball');
    const boundingBox = ballElement.getBoundingClientRect();
    const ballWidth = boundingBox.width;
    const ballHeight = boundingBox.height;

    return (
      boundingBox.top <= 3000 ||
      boundingBox.bottom >= ((window.innerHeight + 2000) - ballHeight) ||
      boundingBox.left <= 3000 ||
      boundingBox.right >=  ((window.innerWidth + 2000) - ballWidth) 
    );
  }

  private getRandomDirection(): string {
    // Generate a random direction
    const directions = ['up', 'down', 'left', 'right'];
    return directions[Math.floor(Math.random() * directions.length)];
  }
}
