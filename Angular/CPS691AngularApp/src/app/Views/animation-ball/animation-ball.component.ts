import { Component, ViewChild, ElementRef} from '@angular/core';
import { Ball } from 'src/app/Classes/ball';

@Component({
  selector: 'app-animation-ball',
  templateUrl: './animation-ball.component.html',
  styleUrls: ['./animation-ball.component.css'],
})

export class AnimationBallComponent{
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  public balls : Ball[] = [];
  public isAnimationRunning: boolean = false;

  // Default values for test
  public animationAmount: number = 20;
  public animationSpeed: number = 5;
  
  ngAfterViewInit(){
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.startTest();
    this.generateBalls(this.animationAmount, this.animationSpeed);
    this.animateBalls();
  }

  onSubmit() {
    this.startTest();
    this.generateBalls(this.animationAmount, this.animationSpeed);
    this.animateBalls();
  }

  generateBalls(ballCount, ballSpeed){
    //Variables for initializing balls
    const ballRadius: number = 10;
    const ballColor: string = '#0000ff';

    //Add the determined amount of balls to the animation
    for (let i = 0; i < ballCount; i++){
      let start_x: number = Math.floor(Math.random() * 900);
      let start_y: number = Math.floor(Math.random() * 400);
      this.balls.push(new Ball(start_x, start_y, ballSpeed, ballSpeed, ballRadius, ballColor))
    }
  }

  animateBalls(){
    //Stop the animation from continuing if animation isn't running
    if(!this.isAnimationRunning){
      return;
    }
    
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0,0, canvas.width, canvas.height);

    //Iterate through aray of balls, adjusting cordinates
    for (const ball of this.balls){
      //stepForward() moves the ball based on an X and Y axis
      ball.stepForward(canvas.width, canvas.height);
        //Check if the ball has hit a boundary and reverse its velocity if needed
      if (ball._x - ball._radius <= 0 || ball._x + ball._radius >= canvas.width) {
        ball._xVel *= -1;
      }
      if (ball._y - ball._radius <= 0 || ball._y + ball._radius >= canvas.height) {
        ball._yVel *= -1;
      }
      this.drawBall(ball);
    }
    
    //Repeat the cycle
    requestAnimationFrame(() => this.animateBalls());
  }

  drawBall(ball: Ball) {
    this.ctx.beginPath();
    this.ctx.arc(ball._x, ball._y, ball._radius, 0, Math.PI * 2);
    this.ctx.fillStyle = ball._color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  endTest(){
    this.isAnimationRunning = false;
    this.balls = []; // Clear the array of balls
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Clear the canvas
  }

  startTest(){
    this.isAnimationRunning = true;
  }
}
