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
    // console.log('start editing');
    this.editingTodo = { ...todo };
    // console.log('editing todo: ' + this.editingTodo.task);
    this.editing = true;
    // console.log('editing: ' + this.editing);
  }

  onEditDone() {
    // console.log('edit done');
    this.store.dispatch(requestUpdateAction({ todo: this.editingTodo }));
    // console.log('editing todo: ' + this.editingTodo.task);
    this.editing = false;
    // console.log('editing: ' + this.editing);
  };
  startAdding() {
    // console.log('start adding');
    this.addingTodo = { id: 0, task: "", checked: false };
    // console.log('adding todo: ' + this.addingTodo.task);
    this.adding = true;
    // console.log('adding: ' + this.adding);
  }

  onAddingDone() {
    console.log('adding done');
    this.store.dispatch(requestAddAction({ todo: this.addingTodo }));
    console.log('adding todo: ' + this.addingTodo.task);
    this.adding = false;
    console.log('adding: ' + this.adding);
  };

  delete(id: number): void {
    this.store.dispatch(requestDeleteAction({ id: id }));
  }
}
