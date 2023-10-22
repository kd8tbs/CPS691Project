import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimationBallComponent } from './Views/animation-ball/animation-ball.component';

const routes: Routes = [
  {path: 'Views/animation-ball',  component: AnimationBallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
