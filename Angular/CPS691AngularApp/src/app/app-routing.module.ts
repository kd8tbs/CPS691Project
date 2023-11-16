import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimationBallComponent } from './Views/animation-ball/animation-ball.component';
import { AnimationPulseComponent } from './Views/animation-pulse/animation-pulse.component';
import { AnimationFadeComponent } from './Views/animation-fade/animation-fade.component';

const routes: Routes = [
  {path: 'Views/animation-ball',  component: AnimationBallComponent},
  {path: 'Views/animation-fade', component: AnimationFadeComponent},
  {path: 'Views/animation-pulse', component: AnimationPulseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
