import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../reducers';
import { login } from '../auth.actions';
import { AuthActions } from '../action-types';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['test5@test.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  login() {
    const val = this.form.value;
    this.authService.login(val.email, val.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/posts');
      },
      error: (error) => {
        console.log(error);
        error.errors.forEach((cur: any) => {
          alert(cur.msg);
        });
      },
    });
  }
}
