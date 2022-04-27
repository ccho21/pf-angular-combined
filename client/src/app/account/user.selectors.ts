import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './reducers';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (user) => {
  return user.user;
});

export const isUserLoaded = createSelector(
  selectUserState,
  (state) => state.userLoaded
);

export const isSameUser = (id: string) =>
  createSelector(selectUserState, (state) => {
    return state.user?._id === id;
  });
