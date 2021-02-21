import { EditComponent } from './edit/edit.component';
import { GuardComponent } from './guard.component';
import { RoutingGuardModule } from './routing-guard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingGuardModule
  ],
  declarations: [GuardComponent, ListComponent, DetailComponent, EditComponent]
})
export class ModuleGuardModule { }