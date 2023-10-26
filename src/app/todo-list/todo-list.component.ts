import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from "@ngrx/store";
import {first, Observable} from "rxjs";
import { tap, map } from "rxjs/operators";

import { Todo } from "../todo.model";

import {
  requestAddAction,
  requestUpdateAction,
  requestDeleteAction,
  requestLoadAction,
  requestToggleAction,
} from "../todo.actions";
import { TodoState } from "../todo.reducer";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @ViewChild('editingInput') editingInput!: ElementRef;
  @ViewChild('addingInput') addingInput!: ElementRef;

  todo$: Observable<Todo[]>;
  sortedTodos$: Observable<Todo[]>; // by 'checked'
  filteredTodos$: Observable<Todo[]>; // by 'checked' = true
  editing: boolean = false;
  adding: boolean = false;
  deleting: boolean = false;
  editingTodo: any;
  addingTodo: any;

  constructor(private store: Store<TodoState>) {
    this.todo$ = store.pipe(select('todos'));

    // sort by 'checked' property (unchecked first)
    this.sortedTodos$ = this.todo$.pipe(
      // tap(todos => console.log('Original Todos:', todos)),
      map(todos => {
        return todos.slice().sort((a, b) => {
          if (!a.checked && b.checked) {
            return -1; // 'a' comes before 'b'
          } else if (a.checked && !b.checked) {
            return 1; // 'b' comes before 'a'
          } else {
            return 0; // order remains unchanged
          }
        });
      }),
      // tap(sortedTodos => console.log('Sorted Todos:', sortedTodos))
    );

    this.filteredTodos$ = this.todo$.pipe(
      map(todos => todos.filter(todo => todo.checked))
    );

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

    // After setting editingTodo and other logic, focus the input field
    setTimeout(() => {
      this.editingInput.nativeElement.focus();
    });
  }

  onEditDone() {
    this.store.dispatch(requestUpdateAction({ todo: this.editingTodo }));
    this.editing = false;
  };
  startAdding() {
    this.addingTodo = { id: 0, task: "", checked: false };
    this.adding = true;

    // After setting addingTodo and other logic, focus the input field
    setTimeout(() => {
      this.addingInput.nativeElement.focus();
    });
  }

  onAddingDone() {
    this.deleting = false;
    if (this.addingTodo.task === "") {
      this.adding = false;
    } else {
      this.store.dispatch(requestAddAction({ todo: this.addingTodo }));
      this.adding = false;
    }
  };

  startDeleting() {
    this.filteredTodos$.pipe(first()).subscribe(todos => {
      if (todos.length === 0) {
      } else {
        this.deleting = true;
      }
    });
  }

  delete(id: number): void {
    this.store.dispatch(requestDeleteAction({ id: id }));
  }

  onDeleteDone(): void {
    this.deleting = false;
  }

}
