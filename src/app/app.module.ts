import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EditExcursionPageModule } from './edit-excursion-page/edit-excursion-page.module';
import { ExcursionsPageModule } from './excursions-page/excursions-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { NavbarModule } from './navbar/navbar.module';
import { PrintExcursionPageModule } from './print-excursion-page/print-excursion-page.module';
import { ProfilePageModule } from './profile-page/profile-page.module';
import { ProfileEditPageModule } from './profile-edit-page/profile-edit-page.module';
import { RegistrationPageModule } from './registration-page/registration-page.module';
import { ResetPasswordPageModule } from './reset-password-page/reset-password-page.module';
import { UsersPageModule } from './users-page/users-page.module';

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
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    EditExcursionPageModule,
    ExcursionsPageModule,
    HomePageModule,
    NavbarModule,
    PrintExcursionPageModule,
    ProfilePageModule,
    ProfileEditPageModule,
    ReactiveFormsModule,
    RegistrationPageModule,
    ResetPasswordPageModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    UsersPageModule
  ],
  providers: []
})
export class AppModule { }
