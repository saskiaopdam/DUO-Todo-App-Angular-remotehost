import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";

import {
  addActionSuccess,
  updateActionSuccess,
  deleteActionSuccess,
  loadActionSuccess,
  requestAddAction,
  requestUpdateAction,
  requestDeleteAction,
  requestLoadAction,
} from "./todo.actions";

import { Todo } from "./todo.model";
import { TodoService } from "./todo.service";
import {requestToggleAction} from "./todo.actions";
import {toggleActionSuccess} from "./todo.actions";

@Injectable()
export class TodoEffects {

  constructor(
    private todoService: TodoService,
    private action$: Actions) {
  }

  addTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestAddAction),
      mergeMap(action =>
        this.todoService.add(action.todo)
          .pipe(
            map((data: Todo) =>
              addActionSuccess({todo: data})
            ), //catchError(err => addActionFailure({error: err}))
          ))))

  toggleTodoChecked$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestToggleAction),
      mergeMap(action =>
        this.todoService.toggle(action.todo)
          .pipe(
            map((data: Todo) =>
              toggleActionSuccess({todo: data})
            ), //catchError(err => addActionFailure({error: err}))
          ))))

  updateTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestUpdateAction),
      mergeMap(action =>
        this.todoService.update(action.todo)
          .pipe(
            map((data: Todo) =>
              updateActionSuccess({todo: data})
            ), //catchError(err => addActionFailure({error: err}))
          ))))

  deleteTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestDeleteAction),
      mergeMap(action =>
        this.todoService.delete(action.id)
          .pipe(
            map(() =>
              deleteActionSuccess({id: action.id})
            )))))

    loadTodos$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestLoadAction),
      mergeMap(action =>
        this.todoService.load()
          .pipe(
            map((data: Todo[]) =>
              loadActionSuccess({todos: data})
            )))))

}
