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
    Backendless.UserService.getCurrentUser<AppUser>()
      .then((loggedInUser) => {
        console.log(loggedInUser);
        Backendless.UserService.setCurrentUser<AppUser>(loggedInUser, true);
        this.user = loggedInUser;
      })
      .catch(function (error) {
        console.error('Can not get user profile:', error.message);
        return error.message;
      });
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
        console.log('user logged in : ' + loggedInUser);
        Backendless.UserService.setCurrentUser<AppUser>(loggedInUser, true);
      })
      .catch(function (error) {
        console.error('Can not login User:', error.message);
        return error;
      });
  }

  async awaitGetProfile(){
    return await this.getProfile();
  }

  async getProfile() {
    return Backendless.UserService.getCurrentUser<AppUser>()
      .then((loggedInUser) => {
        console.log(loggedInUser);
        Backendless.UserService.setCurrentUser<AppUser>(loggedInUser, true);
        return loggedInUser;
      })
      .catch(function (error) {
        console.error('Can not get user profile:', error.message);
        return error.message;
      });
  }

  editProfile(username: string, email: string, tel?: string) {
    Backendless.UserService.getCurrentUser()
      .then(function (currentUser: AppUser) {
        currentUser.email = email!;
        currentUser.username = username!;
        currentUser.tel = tel;
        Backendless.UserService.update(currentUser)
          .then(function (updatedUser) {
            Backendless.UserService.setCurrentUser<AppUser>(updatedUser);
          })
          .catch(function (error) {
            console.error('Can not edit user profile:', error.message);
            return error;
          });
      })
      .catch(function (error) {
        console.error('Can not retrieve user profile:', error.message);
        return error;
      });
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
