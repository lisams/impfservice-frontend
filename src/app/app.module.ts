import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { VaccinationListComponent } from './components/vaccination-list/vaccination-list.component';
import { AppRoutingModule } from './app-routing.module';
import { VaccinationDetailComponent } from './components/vaccination-detail/vaccination-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { VaccinationFormComponent } from './components/vaccination-form/vaccination-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VaccinationListComponent,
    VaccinationDetailComponent,
    UserDetailComponent,
    VaccinationFormComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
