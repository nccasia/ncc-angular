import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModuleComponent } from './routing-module.component';
import { HerosComponent } from './heros/heros.component';
import { HeroListComponent } from './heros/hero-list/hero-list.component';
import { HeroDetailComponent } from './heros/hero-detail/hero-detail.component';
import { CarsComponent } from './cars/cars.component';

const routes: Routes = [
  {
    path: '',
    component: RoutingModuleComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'heros'
      },
      {
        path: 'heros',
        component: HerosComponent,
        // nesting routes
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'list',
            component: HeroListComponent,
          },
          {
            path: 'detail/:id',
            component: HeroDetailComponent,
          },
        ]
      },
      {
        path: 'cars',
        component: CarsComponent,
      },
    ]
  }
]


@NgModule({
  declarations: [RoutingModuleComponent, HerosComponent, HeroListComponent, HeroDetailComponent, CarsComponent],
  imports: [
    CommonModule,
    // Setup router cho lazy loading module
    RouterModule.forChild(routes)
  ]
})
export class RoutingModuleModule { }
