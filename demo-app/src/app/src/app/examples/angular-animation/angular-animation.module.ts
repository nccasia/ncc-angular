import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularAnimationComponent } from './angular-animation.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AngularAnimationComponent
  }
]

@NgModule({
  declarations: [AngularAnimationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AngularAnimationModule { }
