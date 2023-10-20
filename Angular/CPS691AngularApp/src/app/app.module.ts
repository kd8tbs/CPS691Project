import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ButtonComponent } from './Components/button/button.component';
import { TextFieldComponent } from './Components/text-field/text-field.component';
import { ViewBallComponent } from './Views/view-ball/view-ball.component';
import { BallComponent } from './Components/ball/ball.component';
import { AnimationBallComponent } from './Components/Animations/animation-ball/animation-ball.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ButtonComponent,
    TextFieldComponent,
    ViewBallComponent,
    BallComponent,
    AnimationBallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
