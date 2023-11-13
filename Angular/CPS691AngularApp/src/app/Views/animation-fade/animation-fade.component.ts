import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

//Static animation duration, because Angular animations don't allow for dyanmic duration change
const animationDuration = '1000ms'; 
// ADJUST THIS TO CHANGE ANIMATION SPEED, AND CHANGE THE ANIMATION INTERVAL DURATION ACCORDINGLY

//Animation transitions
const enterTransition = transition(':enter', [
  style({ opacity: 0 }),
  animate(animationDuration, style({ opacity: 1 }))
]);

const leaveTrans = transition(':leave', [
  style({ opacity: 1 }),
  animate(animationDuration, style({ opacity: 0 }))
]);

//Animation triggers
const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@Component({
  selector: 'app-animation-fade',
  templateUrl: './animation-fade.component.html',
  styleUrls: ['./animation-fade.component.css'],
  animations: [fadeIn, fadeOut]
})
export class AnimationFadeComponent implements OnInit {
  @ViewChild('animationCanvas') animationCanvas: ElementRef;
  squares: { x: number; y: number;}[] = [];
  public showAnimation: boolean = false;
  public intervalID;

  //Default variables for test
  public animationAmount: number = 50;
  public animationIntervalDuration: number = 2000; //The miliseconds it takes to complete a full fade in/out animation

  ngOnInit(): void {
    this.animateSquares(this.animationAmount, this.animationIntervalDuration);
  }

  public onSubmit(){
    this.endTest();
    this.animateSquares(this.animationAmount, this.animationIntervalDuration);
  }

  private animateSquares(numberOfSquares, intervalDuration){
    //Set an interval to continuously loop
    this.intervalID = setInterval(() => this.intervalFunction(intervalDuration, numberOfSquares), intervalDuration);
  }

  private intervalFunction(intervalDuration, numberOfSquares) {
    //Initialize squares
    this.squares = [];
    for (let i = 0; i < numberOfSquares; i++){
      this.addSquare();
    }

    //Fade-in animation
    this.showSquares();
    //Fade-out halfway through the intervalDuration
    setTimeout(() => this.hideSquares(), intervalDuration / 2);
  }

  private addSquare(){
    const animCanvas = this.animationCanvas.nativeElement;
    const divRect = animCanvas.getBoundingClientRect();
    
    //Padding added to prevent any squares from crossing the div boundary
    let maxPadding = 5;
    let minPadding = 15;

    // Determine the boundaries of the div
    const top = divRect.top + maxPadding; 
    const bottom = divRect.bottom - minPadding;
    const left = divRect.left + maxPadding;
    const right = divRect.right - minPadding;

    //Assign a random x and y cordinate
    const square = {
      x: this.getRandomPosition(left,right),
      y: this.getRandomPosition(top,bottom)
    };
    this.squares.push(square);
  }

  private getRandomPosition(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public endTest(){
    clearInterval(this.intervalID);
  }

  private showSquares(){
    this.showAnimation = true;
  }

  private hideSquares(){
    this.showAnimation = false;
  }
}
