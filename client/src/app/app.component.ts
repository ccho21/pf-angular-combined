import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { concatMap, Observable, tap } from 'rxjs';
import { login, logout } from './auth/auth.actions';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { User } from './auth/model/user';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pf-angular';

  loading = true;

  isLoggedIn$: Observable<boolean> | undefined;

  isLoggedOut$: Observable<boolean> | undefined;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get token when it is stored in local storage.
    const user = localStorage.getItem('user');

    if (user) {
      this.store.dispatch(login({ user: JSON.parse(user) }));
    }
    // if the token is valid, Request a authentication to get the user profile.
    // Store user profile in the state
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
