import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { IUser } from '../shared/interfaces';
import Backendless from 'backendless';

class AppUser extends Backendless.User {
  tel?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<undefined | null | AppUser>(undefined);
  user$ = this.user$$
    .asObservable()
    .pipe(filter((val): val is AppUser | null => val !== undefined));

  // const user: AppUser = new AppUser();

  user: AppUser | null = null;

  subscription: Subscription;

  get isLoggedIn() {
    return Backendless.UserService.loggedInUser();
  }

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(username: string, email: string, password: string, tel?: string) {
    const user: AppUser = new AppUser();
    user.email = email!;
    user.password = password!;
    user.username = username!;
    var err = null;
    Backendless.UserService.register<AppUser>(user)
      .then((result: AppUser) => {
        console.log('Registered User:', result);
        return this.login(email, password);
      })
      .catch((error) => {
        console.error('Can not Register User:', error.message);
        return error;
      });
  }

  login(email: string, password: string) {
    Backendless.UserService.login(email, password, true)
      .then(function (loggedInUser) {
        console.log('user logged in : ' + loggedInUser)
      })
      .catch(function (error) {
        console.error('Can not login User:', error.message);
        return error;
      });
  }

  getProfile() {
    Backendless.UserService.getCurrentUser()
    .then(function (loggedInUser) {})
    .catch(function (error) {
      console.error('Can not login User:', error.message);
      return error;
    });
  }

  editProfile(objectId: string, username: string, email: string, tel?: string) {
    return this.http
      .put<IUser>('/api/users/' + objectId, { username, email, tel })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return Backendless.UserService.logout()
    .then(function (loggedInUser) {})
    .catch(function (error) {
      console.error('Can not login User:', error.message);
      return error;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
