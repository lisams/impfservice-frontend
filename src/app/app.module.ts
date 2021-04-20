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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VaccinationListComponent,
    VaccinationDetailComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
