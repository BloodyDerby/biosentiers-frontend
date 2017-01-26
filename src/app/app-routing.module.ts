import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: RegistrationPageComponent
  },
  {
    path: 'users',
    component: UsersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
