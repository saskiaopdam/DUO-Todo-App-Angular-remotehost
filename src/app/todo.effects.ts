import { catchError, map, mergeMap } from "rxjs/operators";
import {
    addActionSuccess,
    saveActionSuccess,
    deleteActionSuccess,
    loadActionSuccess,
    requestAddAction,
    requestSaveAction,
    requestDeleteAction,
    requestLoadAction
} from "./todo.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Todo } from "./todo";
import { TodoService } from "./todo.service";

function addActionFailure(param: { error: any }) {
  return undefined;
}

@Injectable()
export class TodoEffects {

  constructor(
    private todoService: TodoService,
    private action$: Actions) {
  }

  loadTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestLoadAction),
      mergeMap(action =>
        this.todoService.load()
          .pipe(
            map((data: Todo[]) =>
              loadActionSuccess({todos: data})
            )))))

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

  saveTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(requestSaveAction),
      mergeMap(action =>
        this.todoService.save(action.todo)
          .pipe(
            map((data: Todo) =>
              saveActionSuccess({todo: data})
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

}
