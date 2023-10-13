import { createReducer, on } from "@ngrx/store";
import { Todo } from "./todo";
import {
  addActionSuccess,
  saveActionSuccess,
  deleteActionSuccess,
  loadActionSuccess,
  selectItem,
  editItem
} from "./todo.actions";

// nieuw
export interface TodoState {
  selectedItemId: number | null;
  todos: Todo[]
}
export const initialState: Todo[] = [], selectedItemId = null;

export const todoReducer = createReducer(
  initialState,

  // nieuw
  on(selectItem, (state, { itemId }) => ({ ...state, selectedItemId: itemId })),
  on(editItem, (state, { itemId, newItemData }) => {
    // Handle item edit logic here and return the updated state
    return state;
  }),
// eind nieuw
  on(addActionSuccess, (state, action) =>
    [...state, action.todo]
  ),
  on(saveActionSuccess, (state, action) =>
      state.map(todo => (todo.id === action.todo.id ? action.todo: todo))
  ),
  on(deleteActionSuccess, (state, action) =>
    state.filter(todo => todo.id != action.id)
  ),
  on(loadActionSuccess, (state, action) =>
    action.todos
  ),
);
