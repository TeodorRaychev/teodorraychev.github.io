import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailDomains } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';
import Backendless from 'backendless';

class AppUser extends Backendless.User {
  tel?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  showEditMode = false;
  formSubmitted = false;

  get user() {
    const { username, email, tel: telephone } = Backendless.UserService.currentUser as AppUser;
    var ext = '+359';
    var tel = [''];
    if (telephone) {
      [ext, ...tel] = telephone.split(' ');
    }
    return {
      username,
      email,
      tel: tel.join(' '),
      ext,
    };
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // this.form.setValue(this.user);
    this.form.setValue({
      username: this.user.username!,
      email: this.user.email!,
      ext: this.user.ext,
      tel: this.user.tel,
    });
  }
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, appEmailValidator(appEmailDomains)]],
    ext: [''],
    tel: [''],
  });

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
    if (this.showEditMode) {
      this.formSubmitted = false;
    }
  }

  saveProfile(): void {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const { username, email, ext, tel } = this.form.value;

    this.authService.editProfile(username!, email!, ext + ' ' + tel);

    this.toggleEditMode();
  }
}
