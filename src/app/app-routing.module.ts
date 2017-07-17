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
import { EditExcursionThemesStepComponent } from './edit-excursion-page/edit-excursion-themes-step.component';
import { EditExcursionZonesStepComponent } from './edit-excursion-page/edit-excursion-zones-step.component';

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

      // ADMIN ROUTES
      // All children of this route requires the user to have the "admin" role
      {
        path: '',
        data: {
          requiredRole: 'admin'
        },
        children: [
          {
            path: 'users',
            component: UsersPageComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
