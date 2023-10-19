import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";

import { Todo } from "../todo.model";
import { Observable } from "rxjs";
import {
  requestAddAction,
  requestDeleteAction,
  requestLoadAction,
  requestToggleAction, requestUpdateAction
} from "../todo.actions";
import { AppState } from "../todo.reducer";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todo$: Observable<Todo[]>;
  editing: boolean = false;
  editingTodo: any;
  adding: boolean = false;
  addingTodo: any;

  constructor(private store: Store<AppState>) {
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
    this.store.dispatch(requestToggleAction({ todo: toggledTodo }));
  }

  startEditing(todo: any) {
    this.editingTodo = { ...todo };
    this.editing = true;
  }

  onEditDone() {
    this.store.dispatch(requestUpdateAction({ todo: this.editingTodo }));
    this.editing = false;
  };
  startAdding(todo: any) {
    this.addingTodo = { ...todo };
    let addingTodo = {
      task: "",
      id: 0,
      checked: false,
    };
    this.adding = true;
  }

  onAddingDone() {
    this.store.dispatch(requestAddAction({ todo: this.addingTodo }));
    this.adding = false;
  };

  delete(id: number): void {
    this.store.dispatch(requestDeleteAction({ id: id }));
  }
}
