import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-pulse',
  templateUrl: './animation-pulse.component.html',
  styleUrls: ['./animation-pulse.component.css']
})
export class AnimationPulseComponent implements OnInit{

  //Default variables for test
  public animationAmount: number = 50;
  public animationIntervalDuration: number = 2000; //The miliseconds it takes to complete a full fade in/out animation

  
  ngOnInit(): void {
      
  }

  onSubmit(){

  }

  endTest(){
    
  }

}
