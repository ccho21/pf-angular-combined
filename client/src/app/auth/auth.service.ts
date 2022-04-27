import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, Observable, tap } from 'rxjs';
import { User } from './model/user';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { login } from './auth.actions';
@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:5000/api/auth', { email, password }).pipe(
      tap((res: any) => {
        console.log(res);
        const { user, token } = res;
        if (user && token) {
          console.log(user, token);
          // store user profile to state.
          this.store.dispatch(login({ user: user }));

          // Store jwt on local storage.
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  signup(
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    thumbnail: string
  ): Observable<User> {
    const user = {
      username,
      email,
      password,
      firstname,
      lastname,
      thumbnail,
    };
    return this.http
      .post<User>('http://localhost:5000/api/users/sign-up', user, {
        headers: { skip: 'true' },
      })
      .pipe(
        tap((res: any) => {
          console.log(res);
          const { user, token } = res;
          if (user && token) {
            // store user profile to state.
            this.store.dispatch(login({ user: user }));

            // Store jwt on local storage.
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
      );
  }
  getAthentication(token: String): Observable<User> {
    return this.http.get<User>('http://localhost:5000/api/auth');
  }
}
