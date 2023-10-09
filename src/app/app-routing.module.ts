import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoDetailComponent } from "./todo-detail/todo-detail.component";

const routes: Routes = [
  { path: 'detail/:id', component: TodoDetailComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
