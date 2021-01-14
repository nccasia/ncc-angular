import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpExampleComponent } from './http-example.component';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: '',
    component: HttpExampleComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'edit/:id',
        component: AddEditUserComponent
      },
      {
        path: 'add',
        component: AddEditUserComponent
      },
    ]
  }
]

@NgModule({
  declarations: [HttpExampleComponent, UserListComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HttpExampleModule { }
