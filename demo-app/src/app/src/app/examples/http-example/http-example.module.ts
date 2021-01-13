import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpExampleComponent } from './http-example.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HttpExampleComponent
  }
]

@NgModule({
  declarations: [HttpExampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HttpExampleModule { }
