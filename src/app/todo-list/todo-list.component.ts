import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

import { Todo } from "../todo.model";

import {
  requestAddAction,
  requestUpdateAction,
  requestDeleteAction,
  requestLoadAction,
  requestToggleAction,
} from "../todo.actions";
import { AppState } from "../todo.reducer";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @ViewChild('editInput') editInput!: ElementRef;
  @ViewChild('addingInput') addingInput!: ElementRef;

  todo$: Observable<Todo[]>;
  sortedTodos$: Observable<Todo[]>;
  editing: boolean = false;
  editingTodo: any;
  adding: boolean = false;
  addingTodo: any;
  deleting: boolean = false;

  constructor(private store: Store<AppState>) {
    this.todo$ = store.pipe(select('todos'));

    // sort by 'checked' property (unchecked first)
    this.sortedTodos$ = this.todo$.pipe(
      tap(todos => console.log('Original Todos:', todos)),
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
      tap(sortedTodos => console.log('Sorted Todos:', sortedTodos))
    );

    // first sort by 'checked', then sort by 'task'
    // this.sortedTodos$ = this.todo$.pipe(
    //   tap(todos => console.log('Original Todos:', todos)),
    //   map(todos => {
    //     return todos.slice().sort((a, b) => {
    //       // Sort by checked property first (unchecked items first)
    //       if (!a.checked && b.checked) {
    //         return -1; // 'a' comes before 'b'
    //       } else if (a.checked && !b.checked) {
    //         return 1; // 'b' comes before 'a'
    //       } else {
    //         // If checked status is the same, sort alphabetically by 'task'
    //         return a.task.localeCompare(b.task);
    //       }
    //     });
    //   }),
    //   tap(sortedTodos => console.log('Sorted Todos:', sortedTodos))
    // );

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

    // After setting editingTodo and other logic, focus the input field
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    });
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

    // After setting addingTodo and other logic, focus the input field
    setTimeout(() => {
      this.addingInput.nativeElement.focus();
    });
  }

  onAddingDone() {
    console.log('adding done');
    this.store.dispatch(requestAddAction({ todo: this.addingTodo }));
    console.log('adding todo: ' + this.addingTodo.task);
    this.adding = false;
    console.log('adding: ' + this.adding);
  };

  startDeleting() {
    this.deleting = true;
  };

  delete(id: number): void {
    this.store.dispatch(requestDeleteAction({ id: id }));
  }

  onDeleteDone(): void {
    this.deleting = false;
  }
}
