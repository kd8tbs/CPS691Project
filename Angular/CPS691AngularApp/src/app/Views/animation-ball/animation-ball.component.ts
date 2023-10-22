import { Component, ViewChild, ElementRef} from '@angular/core';
import { Ball } from 'src/app/Classes/ball';

@Component({
  selector: 'app-animation-ball',
  templateUrl: './animation-ball.component.html',
  styleUrls: ['./animation-ball.component.css'],
})

export class AnimationBallComponent {
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  public balls : Ball[] = [];
  public isAnimationRunning: boolean = false;

  public startAnimationAmount: number = 0;
  public startSpeed: number = 5;
  public testDuration: number = 0;

  //Variables not being used right now
  public incrementDuration: number = 0;
  public animationIncrement: number = 0;
  public speedIncrement: number = 0;

  ngAfterViewInit(){
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  onSubmit() {
    //Variables for initializing balls
    const ballRadius: number = 10;
    const ballColor: string = '#0000ff';
    const ballSpeed = this.startSpeed; //Set to 5 rn
    const ballAmount = this.startAnimationAmount;
  
    //Add the determined amount of balls to the animation
    for (let i = 0; i < ballAmount; i++){
      let start_x: number = Math.floor(Math.random() * 900);
      let start_y: number = Math.floor(Math.random() * 400);
      this.balls.push(new Ball(start_x, start_y, ballSpeed, ballSpeed, ballRadius, ballColor))
    }

    //Begin testing
    this.startTest();
    const animationStartTime = Date.now();
    this.animateBalls(animationStartTime);
  }

  animateBalls(startTime){
    //Stop the animation from continuing if animation isn't running
    if(!this.isAnimationRunning){
      return;
    }
    
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0,0, canvas.width, canvas.height);

    //Iterate through aray of balls, adjusting cordinates
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
    
    if(this.isTestOver(startTime)){
      this.endTest();
    }else{
      requestAnimationFrame(() => this.animateBalls(startTime));
    }
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
  }

  startTest(){
    this.isAnimationRunning = true;
  }

  isTestOver(startTime){
    const elapsedTime = Date.now() - startTime;
    return elapsedTime >= (this.testDuration * 1000); //Converted testDuration from seconds to miliseconds. 
  }
}
