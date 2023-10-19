import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewBallComponent } from './Views/view-ball/view-ball.component';

const routes: Routes = [
  {path: 'Views/view-ball',  component: ViewBallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
