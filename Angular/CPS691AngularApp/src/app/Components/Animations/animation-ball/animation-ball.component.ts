import { Component, AfterViewInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { state, trigger, style, animate, transition, keyframes } from '@angular/animations';
import { Ball } from 'src/app/Classes/ball';
import { ButtonComponent } from '../../button/button.component';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-animation-ball',
  templateUrl: './animation-ball.component.html',
  styleUrls: ['./animation-ball.component.css'],
})

export class AnimationBallComponent {
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  public balls : Ball[] = [];
  public isAnimationStarted: boolean = false;

  public startAnimationAmount: number = 0;
  public startSpeed: number = 0;
  public incrementDuration: number = 0;
  public testDuration: number = 0;
  public animationIncrement: number = 0;
  public speedIncrement: number = 0;


  constructor(){
    this.balls.push(new Ball(100, 100, 2, 2, 20, 'green'));
    this.balls.push(new Ball(700, 700, 2, 2, 20, 'red'));
  }

  ngAfterViewInit(){
    this.adjustCanvasSize();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.animateBalls();
  }

  endTest(){
    this.isAnimationStarted = false;
  }

  onSubmit() {
    // Handle the form submission here
    console.log('Form submitted with values:');
    console.log('Starting Number:', this.startAnimationAmount);
    console.log('Starting Speed:', this.startSpeed);
    console.log('Time Before Increments:', this.incrementDuration);
    console.log('Test Length:', this.testDuration);
    console.log('Animations Added After Increment:', this.animationIncrement);
    console.log('Speed Increase After Increment:', this.speedIncrement);
    
    //Begin testing
    this.isAnimationStarted = true;
    this.animateBalls();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCanvasSize();
  }

  adjustCanvasSize(){
    const canvas = this.canvas.nativeElement;
    const newCanvasWidth = window.innerWidth;
    const newCanvasHeight = newCanvasWidth / 2;
    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;
  }

  animateBalls(){
    if(this.isAnimationStarted){
      const canvas = this.canvas.nativeElement;
      this.ctx.clearRect(0,0, canvas.width, canvas.height);

      for (const ball of this.balls){
        ball.stepForward(canvas.width, canvas.height);
          // Check if the ball has hit a boundary and reverse its velocity if needed
        if (ball._x - ball._radius <= 0 || ball._x + ball._radius >= canvas.width) {
          ball._xVel *= -1;
        }
        if (ball._y - ball._radius <= 0 || ball._y + ball._radius >= canvas.height) {
          ball._yVel *= -1;
        }
        this.drawBall(ball);
      }
      requestAnimationFrame(() => this.animateBalls());
    }
  }

  drawBall(ball: Ball) {
    this.ctx.beginPath();
    this.ctx.arc(ball._x, ball._y, ball._radius, 0, Math.PI * 2);
    this.ctx.fillStyle = ball._color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
