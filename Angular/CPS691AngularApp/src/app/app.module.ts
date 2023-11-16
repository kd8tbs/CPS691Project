import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimationBallComponent } from './Views/animation-ball/animation-ball.component';
import { AnimationFadeComponent } from './Views/animation-fade/animation-fade.component';
import { AnimationPulseComponent } from './Views/animation-pulse/animation-pulse.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationBallComponent,
    AnimationFadeComponent,
    AnimationPulseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
