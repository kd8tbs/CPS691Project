import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './Components/button/button.component';
import { TextFieldComponent } from './Components/text-field/text-field.component';
import { ViewBallComponent } from './Views/view-ball/view-ball.component';
import { AnimationBallComponent } from './Components/Animations/animation-ball/animation-ball.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TextFieldComponent,
    ViewBallComponent,
    AnimationBallComponent
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
