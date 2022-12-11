import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { ErrorComponent } from './core/error/error.component';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: {
      title: '404'
    }
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: {
      title: 'Contacts'
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: 'About Us'
    }
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      title: 'Error'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
