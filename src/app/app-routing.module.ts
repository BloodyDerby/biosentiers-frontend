import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanAccessPage } from './auth/can-access-page';
import { EditExcursionPageComponent } from './edit-excursion-page/edit-excursion-page.component';
import { ExcursionsPageComponent } from './excursions-page/excursions-page.component';
import { EditExcursionDetailsStepComponent } from './edit-excursion-page/edit-excursion-details-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-page/edit-excursion-participants-step.component';
import { EditExcursionThemesStepComponent } from './edit-excursion-page/edit-excursion-themes-step.component';
import { EditExcursionZonesStepComponent } from './edit-excursion-page/edit-excursion-zones-step.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InstallationsPageComponent } from './installations-page';
import { PrintExcursionPageComponent } from './print-excursion-page/print-excursion-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileEditPageComponent } from './profile-edit-page/profile-edit-page.component';
import { RegistrationPageComponent } from './registration-page';
import { CompleteRegistrationPageComponent } from './registration-complete-page/complete-registration-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { StatusPageComponent } from './status-page';
import { UsersPageComponent } from './users-page/users-page.component';
import { ShowExcursionPageComponent } from './excursions-show-page';
import { ShowInstallationPageComponent } from './installations-show-page';
import { EditUserPageComponent } from './users-edit-page';
import { ShowUserPageComponent } from './users-show-page';

const routes: Routes = [

  // PUBLIC ROUTES
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: RegistrationPageComponent
  },
  {
    path: 'register/complete',
    component: CompleteRegistrationPageComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordPageComponent
  },

  // PROTECTED ROUTES
  // All children of this route require the user to be authenticated to access.
  {
    path: '',
    canActivate: [ CanAccessPage ],
    data: {
      requiredRole: 'user'
    },
    children: [
      {
        path: 'excursions',
        component: ExcursionsPageComponent
      },
      {
        path: 'excursions/new',
        component: EditExcursionPageComponent,
        children: [
          {
            path: '',
            component: EditExcursionDetailsStepComponent
          }
        ]
      },
      {
        path: 'excursions/:id',
        component: ShowExcursionPageComponent
      },
      {
        path: 'excursions/:id/edit',
        component: EditExcursionPageComponent,
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
            path: 'zones',
            component: EditExcursionZonesStepComponent
          },
          {
            path: 'themes',
            component: EditExcursionThemesStepComponent
          }
        ]
      },
      {
        path: 'excursions/:id/print',
        component: PrintExcursionPageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: 'profile/edit',
        component: ProfileEditPageComponent
      },

      // ADMIN ROUTES
      // All children of this route requires the user to have the "admin" role
      {
        path: '',
        data: {
          requiredRole: 'admin'
        },
        children: [
          {
            path: 'installations',
            component: InstallationsPageComponent
          },
          {
            path: 'installations/:id',
            component: ShowInstallationPageComponent
          },
          {
            path: 'status',
            component: StatusPageComponent
          },
          {
            path: 'users',
            component: UsersPageComponent
          },
          {
            path: 'users/:id',
            component: ShowUserPageComponent
          },
          {
            path: 'users/:id/edit',
            component: EditUserPageComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
