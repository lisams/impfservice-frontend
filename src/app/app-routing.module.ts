import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {VaccinationListComponent} from './components/vaccination-list/vaccination-list.component';
import {VaccinationDetailComponent} from './components/vaccination-detail/vaccination-detail.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {VaccinationFormComponent} from './components/vaccination-form/vaccination-form.component';
import {LoginComponent} from './components/login/login.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'impfungen', component: VaccinationListComponent },
  { path: 'impfungen/:id', component: VaccinationDetailComponent },
  { path: 'user/:svnr', component: UserDetailComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin/impfung', component: VaccinationFormComponent },
  { path: 'admin/impfung/:id', component: VaccinationFormComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
