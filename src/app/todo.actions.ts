import { createAction, props } from "@ngrx/store";
import { Todo } from "./todo.model";

export const requestToggleAction = createAction(
  '[Todo Component] Toggle', props<{ todo: Todo }>()
);
export const toggleActionSuccess = createAction(
  '[Todo Component] ToggleSuccess', props<{ todo: Todo }>()
);

export const requestAddAction = createAction(
  '[Todo Component] Add', props<{ todo: Todo }>()
);

export const addActionSuccess = createAction(
  '[Todo Component] AddSuccess', props<{ todo: Todo }>()
);

export const requestUpdateAction = createAction(
  '[Todo Component] Update', props<{ todo: Todo }>()
);

export const updateActionSuccess = createAction(
  '[Todo Component] UpdateSuccess', props<{ todo: Todo }>()
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



