import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";

import { Todo } from "../todo.model";
import { Observable } from "rxjs";
import {
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
    console.log(toggledTodo.task + " " + toggledTodo.checked);
    this.store.dispatch(requestToggleAction({ todo: toggledTodo }));
  }

  startEditing(todo: any) {
    console.log('start editing');
    this.editingTodo = { ...todo };
    console.log('editingTodo: ' + this.editingTodo.task);
    this.editing = true;
    console.log('editing: ' + this.editing);
  }

  onEditDone() {
    console.log('edit done');
    this.store.dispatch(requestUpdateAction({ todo: this.editingTodo }));
    console.log('editingTodo: ' + this.editingTodo.task);
    this.editing = false;
    console.log('editing: ' + this.editing);
  };

  onClick(todo: Todo) {
    this.editing = !this.editing;
  };

  update(todo: Todo): void {
    if (todo) {
      this.store.dispatch(requestUpdateAction({ todo: todo }));
      // this.router.navigate(['/']);
    }
  }
  delete(id: number): void {
    this.store.dispatch(requestDeleteAction({ id: id }));
  }
}
