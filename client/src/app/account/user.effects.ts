import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, tap } from 'rxjs/operators';

import { UserActions } from './action-types';
import { userLoaded } from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap((action) => {
        console.log('WHAT USER ID?', action.id);
        return this.userService.getUserById(action.id);
      }),
      map((user) => {
        console.log('USER OM USER EFFECT', user);
        return userLoaded({ user });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService
  ) {}
}
