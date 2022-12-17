import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailDomains } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  showEditMode = false;
  formSubmitted = false;

  get user() {
    const { objectId, username, email, tel: telephone } = this.authService.user!;
    var ext = '+359';
    var tel = ['']
    if(telephone){
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
    `${this.user.username}`;
    `${this.user.email}`;
    `${this.user.ext}`;
    `${this.user.tel}`;
  }
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, appEmailValidator(appEmailDomains)]],
    ext: [''],
    tel: [''],
  });

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
    if(this.showEditMode) {
      this.formSubmitted = false;
    }
  }

  saveProfile(): void {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const { username, email, ext, tel } = this.form.value;

    this.authService.editProfile(username!, email!, ext + ' ' + tel,).subscribe(() => {
      this.toggleEditMode();
    })
  }
}
