import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './model/user';
import { AuthState } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

export const getCurrentUser = createSelector(selectAuthState, (auth) => {
  return auth.user;
});
