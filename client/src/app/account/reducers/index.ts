import { createReducer, on } from '@ngrx/store';

import { User } from '@app/auth/model/user';
import { UserActions } from '../action-types';
export interface UserState {
  user: User | undefined;
  userLoaded: boolean;
}

export const initialUserState: UserState = {
  user: undefined,
  userLoaded: false,
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.userLoaded, (state, action) => {
    return { user: action.user, userLoaded: true };
  })
);
