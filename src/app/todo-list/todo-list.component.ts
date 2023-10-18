import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";

import { Todo } from "../todo.model";
import { Observable } from "rxjs";
import {requestDeleteAction, requestLoadAction, requestToggleAction} from "../todo.actions";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todo$: Observable<Todo[]>;

  constructor(private store: Store<{ todos: Todo[] }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.store.dispatch(requestLoadAction());
  }

  onToggle(todo: Todo) {

    let toggledTodo = {
      task: todo.task,
      id: todo.id,
      checked: !todo.checked,
    };
    console.log(toggledTodo.task + " " + toggledTodo.checked);
    this.store.dispatch(requestToggleAction({ todo: toggledTodo }));
  }

  delete(id: number): void {
    this.store.dispatch(requestDeleteAction({ id: id }));
  }
}
