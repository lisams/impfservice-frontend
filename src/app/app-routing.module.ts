import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {VaccinationListComponent} from './components/vaccination-list/vaccination-list.component';
import {VaccinationDetailComponent} from './components/vaccination-detail/vaccination-detail.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {VaccinationFormComponent} from './components/vaccination-form/vaccination-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'impfungen', component: VaccinationListComponent },
  { path: 'impfungen/:id', component: VaccinationDetailComponent },
  { path: 'user/:svnr', component: UserDetailComponent },
  { path: 'admin', component: VaccinationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
