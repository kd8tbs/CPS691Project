import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ButtonComponent } from './Components/button/button.component';
import { TextFieldComponent } from './Components/text-field/text-field.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ButtonComponent,
    TextFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
