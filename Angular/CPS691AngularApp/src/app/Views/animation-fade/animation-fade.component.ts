import { Component, ViewChild, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

const animationDuration = '1000ms';

const enterTransition = transition(':enter', [
  style({ opacity: 0 }),
  animate(animationDuration, style({ opacity: 1 }))
]);

const leaveTrans = transition(':leave', [
  style({ opacity: 1 }),
  animate(animationDuration, style({ opacity: 0 }))
]);

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
export class AnimationFadeComponent {
  @ViewChild('animationContainer') animationContainer: ElementRef;
  squares: { x: number; y: number;}[] = [];
  public showAnimation: boolean = false;
  public intervalID;

  //Test Variables
  public startAnimationAmount: number = 0;
  public testDuration: number = 0;

  //Variables not being used right now
  public incrementDuration: number = 0;
  public animationIncrement: number = 0;
  public speedIncrement: number = 0;
  public startTransitionSpeed: number = 0;

  public onSubmit(){
    this.animateSquares();
  }

  private animateSquares(){
    const animationIntervalDuration = 2000;
    const animationStartTime = Date.now();
    const testDur = this.testDuration;
    let numOfSquares = this.startAnimationAmount;

    this.intervalID = setInterval(() => this.intervalFunction(testDur, animationStartTime, animationIntervalDuration, numOfSquares), animationIntervalDuration);
  }

  private intervalFunction(testDur, startTime, animationIntervalDuration, numOfSquares) {
    if(this.isTestOver(startTime, testDur)){
      this.endTest();
    }

    this.squares = [];
    for (let i = 0; i < numOfSquares; i++){
      this.addSquare();
    }

    this.showSquares();
    setTimeout(() => this.hideSquares(), animationIntervalDuration / 2);
  }

  private addSquare(){
    const animContainer = this.animationContainer.nativeElement;
    const divRect = animContainer.getBoundingClientRect();
    
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

  private isTestOver(startTime, testDur){
    const elapsedTime = Date.now() - startTime;
    return elapsedTime >= (testDur * 1000); //Converted testDur from seconds to miliseconds. 
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
