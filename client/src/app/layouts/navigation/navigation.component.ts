import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { login, logout } from '@app/auth/auth.actions';
import {
  getCurrentUser,
  isLoggedIn,
  isLoggedOut,
  selectAuthState,
} from '@app/auth/auth.selectors';
import { User } from '@app/auth/model/user';
import { AppState } from '@app/reducers';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  loading = true;

  isLoggedIn$: Observable<boolean> | undefined;

  isLoggedOut$: Observable<boolean> | undefined;

  user$!: Observable<User>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // check if the user is logged in or not
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
    this.user$ = this.store.pipe(select(getCurrentUser)) as Observable<User>;
  }

  logout() {
    console.log('logout');
    this.store.dispatch(logout());
  }
  cancel(e: any) {}
}
