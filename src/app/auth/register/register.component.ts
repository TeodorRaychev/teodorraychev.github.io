import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appEmailDomains } from 'src/app/shared/constants';
import {
  appEmailValidator,
  sameValueGroupValidator,
} from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, appEmailValidator(appEmailDomains)]],
    ext: ['00359'],
    tel: [''],
    pass: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: [''],
      },
      {
        validators: [sameValueGroupValidator('password', 'rePassword')],
      }
    ),
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerHandler() {
    if (this.form.invalid) {
      return;
    }
    const {
      username,
      email,
      pass: { password, rePassword } = {},
      ext,
      tel,
    } = this.form.value;
    this.authService
      .register(
        username!,
        email!,
        password!,
        rePassword!,
        tel
          ? [ext!.startsWith('00') ? ext?.replace('00', '+') : ext, tel].join(
              ' '
            )
          : undefined
      )
      .subscribe((user) => {
        this.authService.user = user;
        this.router.navigate(['/theme/recent']);
      });
    this.form.reset();
  }
}
