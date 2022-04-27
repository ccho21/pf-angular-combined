import { createAction, props } from '@ngrx/store';
import { User } from '@app/auth/model/user';

export const loadUser = createAction(
  '[User Page] Load User',
  props<{ id: string }>()
);

export const userLoaded = createAction(
  '[Load User Effect] User is Loaded',
  props<{ user: User }>()
);
