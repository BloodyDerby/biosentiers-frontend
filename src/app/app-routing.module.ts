import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanAccessPage } from './auth';
import { EditExcursionDetailsStepComponent, EditExcursionPageComponent, EditExcursionParticipantsStepComponent, EditExcursionThemesStepComponent, EditExcursionZonesStepComponent } from './edit-excursion-page';
import { ExcursionsPageComponent } from './excursions-page';
import { HomePageComponent } from './home-page';
import { InstallationsPageComponent } from './installations-page';
import { PrintExcursionPageComponent } from './print-excursion-page';
import { ProfilePageComponent } from './profile-page';
import { ProfileEditPageComponent } from './profile-edit-page';
import { RegistrationPageComponent } from './registration-page';
import { CompleteRegistrationPageComponent } from './registration-complete-page';
import { ResetPasswordPageComponent } from './reset-password-page';
import { StatusPageComponent } from './status-page';
import { UsersPageComponent } from './users-page';
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
