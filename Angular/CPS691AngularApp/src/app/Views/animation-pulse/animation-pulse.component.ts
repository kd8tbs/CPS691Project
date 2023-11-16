import { Component, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';

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
  public intervalID;
  isGrowing: boolean;
  squares: { x: number; y: number;}[] = [];

   //Default variables for test
   public animationAmount: number = 200;
   //CHANGE THIS TO FULL TIME
   public animationIntervalDuration: number = 1000; //The miliseconds it takes to complete a full animation

   constructor(private cdr: ChangeDetectorRef) {}

   ngAfterViewInit(): void {
      this.isFirstInterval = true;
      this.animateSquares(this.animationAmount, this.animationIntervalDuration);
      this.cdr.detectChanges(); //Detect changes and prevent Angular's change detection error
   }
 
   onSubmit(){
     //Remove the current test before starting a new one
     this.endTest()
     this.isFirstInterval = true;
     this.animateSquares(this.animationAmount, this.animationIntervalDuration);
   }
 
   private animateSquares(numberOfSquares, intervalDuration){
     //Set an interval to continuously loop
     this.intervalID = setInterval(() => this.intervalFunction(intervalDuration, numberOfSquares), intervalDuration);

   }
 
   private intervalFunction(intervalDuration, numberOfSquares) {
     if(this.isFirstInterval == true){
      this.generateSquares(numberOfSquares)
      this.isFirstInterval = false;
     }

     //Fade-in animation
     this.isGrowing = true
     //Fade-out halfway through the intervalDuration
     setTimeout(() => this.isGrowing = false, intervalDuration / 2);
   }
 
   private generateSquares(numberOfSquares){
    //Initialize squares
    this.squares = [];
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
     clearInterval(this.intervalID);
   }
}
