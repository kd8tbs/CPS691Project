import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { timer, Subscription, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

//Variables to control the animations
const growScale = 'scale(2)';
//CHANGE THIS TO HALF TIME
const animationTransition = '500ms ease-in-out';
//ANIMATION SCALING AND SPEED IS CONTROLLED HERE

@Component({
 selector: 'app-animation-pulse',
 templateUrl: './animation-pulse.component.html',
 styleUrls: ['./animation-pulse.component.css'],
 animations: [
   trigger('growShrink', [
     state('grow', style({ transform: growScale, backgroundColor: '#FF0000' })),
     state('shrink', style({ transform: 'scale(1)', backgroundColor: '#0000ff' })),
     transition('grow <=> shrink', animate(animationTransition)),
   ]),
 ]
})
export class AnimationPulseComponent implements AfterViewInit{
 @ViewChild('animationCanvas') animationCanvas: ElementRef;
 private isFirstInterval: boolean;
 private timeoutId;
 isGrowing: boolean;
 squares: { x: number; y: number;}[] = [];
 private timerSubscription: Subscription;

 //Default variables for test
 public animationAmount: number = 1000;
 //CHANGE THIS TO FULL TIME
 public animationIntervalDuration: number = 1000; //The miliseconds it takes to complete a full animation

 ngOnDestroy(): void {
   this.endTest(); // Call your cleanup method or perform other cleanup operations here
 }

 ngAfterViewInit(): void {
   this.isFirstInterval = true;
   this.animateSquares(this.animationAmount, this.animationIntervalDuration);
 }

 onSubmit(){
   //Remove the current test before starting a new one
   this.endTest()
   this.isFirstInterval = true;
   this.animateSquares(this.animationAmount, this.animationIntervalDuration);
 }

 private intervalFunction(intervalDuration, numberOfSquares) {
  return new Promise<void>((resolve) => {
    if(this.isFirstInterval == true){
      console.log("Generating Squares")
      this.generateSquares(numberOfSquares)
      this.isFirstInterval = false;
    }
 
    //Fade-in animation
    this.isGrowing = true
    // Clear the previous timeout (if any)
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
 
    // Fade-out halfway through the intervalDuration
    this.timeoutId = setTimeout(() => {
      this.isGrowing = false;
      this.timeoutId = null; // Reset the timeoutId
      resolve();
    }, intervalDuration / 2);
  });
 }
 
 private animateSquares(numberOfSquares, intervalDuration){
  // Create a timer that ticks every intervalDuration milliseconds
  this.timerSubscription = timer(0, intervalDuration).pipe(
    switchMap(() => from(this.intervalFunction(intervalDuration, numberOfSquares)))
  ).subscribe();
 }

 private generateSquares(numberOfSquares){
   // Initialize squares if it hasn't been initialized yet
   if (!this.squares) {
     this.squares = [];
   } else {
     // If squares has already been initialized, clear it before adding new squares
     this.squares.length = 0;
   }

   for (let i = 0; i < numberOfSquares; i++){
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
 }

 private getRandomPosition(min: number, max: number) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 public endTest(){
   this.timerSubscription.unsubscribe();
 }
}

