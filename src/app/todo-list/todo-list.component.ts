import { Component, OnInit } from '@angular/core';

import { Todo } from "../todo";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { requestDeleteAction, requestLoadAction } from "../todo.actions";

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

  delete(id: number): void {
    this.store.dispatch(requestDeleteAction({ id: id }));
  }
}
