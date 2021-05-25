import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {VaccinationListComponent} from './components/vaccination-list/vaccination-list.component';
import {VaccinationDetailComponent} from './components/vaccination-detail/vaccination-detail.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {VaccinationFormComponent} from './components/vaccination-form/vaccination-form.component';
import {LoginComponent} from './components/login/login.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {CanNavigateToAdminGuard} from './guards/can-navigate-to-admin.guard';
import {CanNavigateToUserGuard} from './guards/can-navigate-to-user.guard';
import {AlertPopupComponent} from './components/alert-popup/alert-popup.component';
import {ProfileComponent} from './components/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'impfungen', component: VaccinationListComponent },
  { path: 'impfungen/:id', component: VaccinationDetailComponent },
  { path: 'user/:svnr', component: UserDetailComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'admin/impfung', component: VaccinationFormComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'admin/impfung/:id', component: VaccinationFormComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrierung', component: UserFormComponent },
  { path: 'profil', component: ProfileComponent, canActivate:[CanNavigateToUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard, CanNavigateToUserGuard]
})

export class AppRoutingModule { }
