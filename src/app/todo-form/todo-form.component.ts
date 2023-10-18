import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { Todo } from "../todo.model";
import { requestAddAction } from "../todo.actions";
import { AppState } from "../todo.reducer";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todo: Todo = {id: 0, task: '', checked: false};

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  add(): void {
    this.store.dispatch(requestAddAction({ todo: this.todo }));
    this.todo = {id: 0, task: '', checked: false};
  }
}
