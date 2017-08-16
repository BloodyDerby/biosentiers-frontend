import { BrowserModule } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompleteRegistrationPageModule } from './registration-complete-page';
import { EditExcursionPageModule } from './excursions-edit-page';
import { ExcursionsPageModule } from './excursions-page';
import { PrintExcursionPageModule } from './excursions-print-page';
import { ShowExcursionPageModule } from './excursions-show-page';
import { HomePageModule } from './home-page';
import { InstallationsPageModule } from './installations-page';
import { ShowInstallationPageModule } from './installations-show-page';
import { NavbarModule } from './navbar';
import { ProfilePageModule } from './profile-page';
import { ProfileEditPageModule } from './profile-edit-page';
import { RegistrationPageModule } from './registration-page';
import { ResetPasswordPageModule } from './reset-password-page';
import { StatusPageModule } from './status-page';
import { EditUserPageModule } from './users-edit-page';
import { UsersPageModule } from './users-page';
import { ShowUserPageModule } from './users-show-page';

import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CompleteRegistrationPageModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    EditExcursionPageModule,
    EditUserPageModule,
    ExcursionsPageModule,
    HomePageModule,
    InstallationsPageModule,
    NavbarModule,
    PrintExcursionPageModule,
    ProfilePageModule,
    ProfileEditPageModule,
    ReactiveFormsModule,
    RegistrationPageModule,
    ResetPasswordPageModule,
    ShowExcursionPageModule,
    ShowInstallationPageModule,
    ShowUserPageModule,
    SlimLoadingBarModule.forRoot(),
    StatusPageModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    UsersPageModule
  ],
  providers: [
    Title
  ]
})
export class AppModule { }
