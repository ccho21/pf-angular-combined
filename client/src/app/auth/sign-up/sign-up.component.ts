import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['test@test.com', [Validators.required]],
        password: ['123456', [Validators.required]],
        confirmPassword: ['123456', [Validators.required]],
        firstname: ['test firstname', [Validators.required]],
        lastname: ['test lastname', [Validators.required]],
        thumbnail: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const pw = control.get('password')?.value;
    const confirmPw = control.get('confirmPassword')?.value;
    // console.log('### pw', pw);
    // console.log('### confirm PW', confirmPw);
    return pw === confirmPw ? null : { notSame: true };
  };

  signup(): void {
    console.log('signup function', this.form);
    if (!this.form.valid) {
      return;
    }
    const { email, password, username, firstname, lastname, thumbnail } =
      this.form.value;
    this.authService
      .signup(username, email, password, firstname, lastname, thumbnail)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/posts');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addImages(urls: Array<string>) {
    console.log('### urls :', urls);
    this.form.get('thumbnail')?.setValue(urls[0]);
    console.log('first', this.form.get('thumbnail'));
  }
}
