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
