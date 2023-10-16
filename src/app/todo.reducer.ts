import { createReducer, on } from "@ngrx/store";
import { Todo } from "./todo.model";
import {
  addActionSuccess,
  updateActionSuccess,
  deleteActionSuccess,
  loadActionSuccess,
} from "./todo.actions";


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
);
