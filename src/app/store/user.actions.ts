import { createAction, props } from '@ngrx/store';

export const updateName = createAction(
  '[User]updateFullName',
  props<{ fullName: string | null }>(),
);
export const updateIsLogged = createAction(
  '[User]updateIsLogged',
  props<{ isLogged: boolean }>(),
);
