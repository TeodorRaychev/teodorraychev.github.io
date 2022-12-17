import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { apiInterceptorProvider } from './api.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { CoreModule } from './core/core.module';
import { API_ERROR } from './shared/constants';
import { SharedModule } from './shared/shared.module';
import Backendless from 'backendless';
const APP_ID = 'B3E0BFA1-54F7-45D4-FFE0-2F66D335E900';
const API_KEY = '18353394-F753-4447-87AF-0DE16F298627';
Backendless.serverURL = 'https://eu-api.backendless.com'
Backendless.initApp(APP_ID, API_KEY);

@NgModule({
  declarations: [AppComponent, AuthenticateComponent],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    apiInterceptorProvider,
    {
      provide: API_ERROR,
      useValue: new BehaviorSubject(null),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}