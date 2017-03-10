import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TooltipModule } from 'ng2-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EditExcursionPageModule } from './edit-excursion-page/edit-excursion-page.module';
import { ExcursionsPageModule } from './excursions-page/excursions-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { NavbarModule } from './navbar/navbar.module';
import { PrintExcursionPageModule } from './print-excursion-page/print-excursion-page.module';
import { RegistrationPageModule } from './registration-page/registration-page.module';
import { UsersPageModule } from './users-page/users-page.module';

import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
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
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    EditExcursionPageModule,
    ExcursionsPageModule,
    HomePageModule,
    NavbarModule,
    PrintExcursionPageModule,
    ReactiveFormsModule,
    RegistrationPageModule,
    TooltipModule.forRoot(),
    UsersPageModule
  ],
  providers: []
})
export class AppModule { }
