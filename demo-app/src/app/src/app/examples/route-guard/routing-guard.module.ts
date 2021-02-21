import { CanEditGuard } from './can-edit.guard';
import { GuardComponent } from './guard.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'route-guard',
    component: GuardComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: ':slug',
        component: DetailComponent
      }
      ,
      {
        path: ':slug/edit',
        component: EditComponent,
        canActivate: [CanEditGuard]
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class RoutingGuardModule { }