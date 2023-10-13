import { createAction, props } from "@ngrx/store";
import { Todo } from "./todo";

/// nieuw
export const selectItem = createAction('[Item] Select', props<{ itemId: number }>());

export const editItem = createAction('[Item] Edit', props<{ itemId: number, newItemData: any }>());
/// eind nieuw


export const requestAddAction = createAction(
  '[Todo Component] Add', props<{ todo: Todo }>()
);

export const addActionSuccess = createAction(
  '[Todo Component] AddSuccess', props<{ todo: Todo }>()
);

export const requestSaveAction = createAction(
  '[Todo Component] Save', props<{ todo: Todo }>()
);

export const saveActionSuccess = createAction(
  '[Todo Component] SaveSuccess', props<{ todo: Todo }>()
);

export const requestDeleteAction = createAction(
  '[Todo Component] Delete', props<{ id: number }>()
);

export const deleteActionSuccess = createAction(
  '[Todo Component] DeleteSuccess', props<{ id: number }>()
);

export const requestLoadAction = createAction(
  '[Todo Component] Load'
);

export const loadActionSuccess = createAction(
  '[Todo Component] LoadSuccess', props<{ todos: Todo[] }>()
);



