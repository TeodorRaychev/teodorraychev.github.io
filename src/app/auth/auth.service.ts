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

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
  user$ = this.user$$
  .asObservable()
  .pipe(filter((val): val is IUser | null => val !== undefined));

  user: IUser | null = null;

  subscription: Subscription;

  get isLoggedIn() {
    return this.user !== null;
  }

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    tel?: string
  ) {
    return this.http
      .post<IUser>('/api/users/register', {
        username,
        email,
        password,
        tel,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<IUser>('/api/users/login', {
        login: email,
        password,
      },{
        headers: {'Access-Control-Allow-Origin': 'localhost', 'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS', 'Access-Control-Allow-Headers':
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'}
     })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getProfile() {
    return this.http.get<IUser>('/api/users/profile').pipe(
      tap((user) => this.user$$.next(user)),
      catchError((err) => {
        this.user$$.next(null);
        return of([err]);
      })
    );
  }

  editProfile(objectId: string, username: string, email: string, tel?: string) {
    return this.http.put<IUser>('/api/users/' + objectId, {username, email, tel}).pipe(
      tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .get<void>('/api/users/logout', {})
      .pipe(tap(() => this.user$$.next(null)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
