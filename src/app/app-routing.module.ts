import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanAccessPage } from './auth/can-access-page';
import { EditExcursionPageComponent } from './edit-excursion-page/edit-excursion-page.component';
import { ExcursionsPageComponent } from './excursions-page/excursions-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrintExcursionPageComponent } from './print-excursion-page/print-excursion-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { EditExcursionDetailsStepComponent } from './edit-excursion-page/edit-excursion-details-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-page/edit-excursion-participants-step.component';
import { EditExcursionPoisStepComponent } from './edit-excursion-page/edit-excursion-pois-step.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  },
  /**
   * The extra "home" route is required due to a bug in the router.
   * When a CanActivate guard denies access to the user and navigates to "/",
   * the home component is not rendered. Redirecting to "/home" instead,
   * and having that path redirect to "/", solves the problem for now.
   *
   * There is a pull request to fix the bug already, but it has not been released yet.
   *
   * https://github.com/angular/angular/issues/13530
   * https://github.com/angular/angular/pull/13929
   */
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: 'excursions',
    component: ExcursionsPageComponent,
    canActivate: [ CanAccessPage ]
  },
  {
    path: 'excursions/new',
    component: EditExcursionPageComponent,
    canActivate: [ CanAccessPage ],
    children: [
      {
        path: '',
        component: EditExcursionDetailsStepComponent
      }
    ]
  },
  {
    path: 'excursions/:id/edit',
    component: EditExcursionPageComponent,
    canActivate: [ CanAccessPage ],
    children: [
      {
        path: '',
        component: EditExcursionDetailsStepComponent
      },
      {
        path: 'participants',
        component: EditExcursionParticipantsStepComponent
      },
      {
        path: 'pois',
        component: EditExcursionPoisStepComponent
      }
    ]
  },
  {
    path: 'excursions/:id/print',
    component: PrintExcursionPageComponent,
    canActivate: [ CanAccessPage ]
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
    canActivate: [ CanAccessPage ]
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [ CanAccessPage ],
    data: {
      requiredRole: 'admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
