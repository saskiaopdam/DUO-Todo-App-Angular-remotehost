import { createReducer, on } from "@ngrx/store";
import { Todo } from "./todo.model";
import {
  addActionSuccess,
  updateActionSuccess,
  deleteActionSuccess,
  loadActionSuccess,
  toggleActionSuccess,
} from "./todo.actions";

export interface AppState {
  todos: Todo[];
}

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,

  on(addActionSuccess, (state, action) =>
    [...state, action.todo]
  ),
  on(updateActionSuccess, (state, action) =>
      state.map(todo => (todo.id === action.todo.id ? action.todo: todo))
  ),
  on(deleteActionSuccess, (state, action) =>
    state.filter(todo => todo.id != action.id)
  ),
  on(loadActionSuccess, (state, action) =>
    action.todos
  ),
  on(toggleActionSuccess, (state, action) =>
    state.map(todo => (todo.id === action.todo.id ? {...todo, checked: !todo.checked} : todo))
  ),
);
