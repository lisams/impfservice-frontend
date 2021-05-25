import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {VaccinationListComponent} from './components/vaccination-list/vaccination-list.component';
import {AppRoutingModule} from './app-routing.module';
import {VaccinationDetailComponent} from './components/vaccination-detail/vaccination-detail.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {VaccinationFormComponent} from './components/vaccination-form/vaccination-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {ConfirmPopupComponent} from './components/confirm-popup/confirm-popup.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import {VaccinationService} from './services/vaccination.service';
import {AuthenticationService} from './services/authentication.service';
import {TokenInterceptorService} from './services/token.interceptor';
import {UserService} from './services/user.service';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VaccinationListComponent,
    VaccinationDetailComponent,
    UserDetailComponent,
    VaccinationFormComponent,
    LoginComponent,
    ConfirmPopupComponent,
    AdminHomeComponent,
    AlertPopupComponent,
    UserFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, VaccinationService, UserService, AuthenticationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
