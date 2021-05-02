import {Component, OnInit} from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';
import {ActivatedRoute, Router} from '@angular/router';
import {VaccinationFactory} from '../../shared/vaccination-factory';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../shared/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-vaccination-detail',
  templateUrl: './vaccination-detail.component.html'
})
export class VaccinationDetailComponent implements OnInit {

  vaccination: Vaccination = null;
  vaccinationCompleted = null;

  deletePopupHeadline: string = 'Impfung wirklich löschen?';
  deletePopupText: string;
  deletePopupButton: string = 'Löschen';
  deletePopupOpen: boolean = false;

  registerPopupHeadline: string = 'Für diese Impfung anmelden?';
  registerPopupText: string;
  registerPopupButton: string = 'Verpflichtend anmelden';
  registerPopupOpen: boolean = false;

  currentUser: User = null;

  constructor(
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private us: UserService
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.getCurrentUser();
    this.vs.getVaccinationByID(params.id)
      .subscribe(vacc => {
        console.log(vacc);
        this.vaccination = vacc;
        this.vaccinationCompleted = new Date(vacc.date) < new Date();
        this.deletePopupText = `Soll diese Impfung in ${this.vaccination.location.title} wirklich gelöscht werden? Dieser Schritt kann nicht mehr rückgängen gemacht werden!`;
        this.registerPopupText = `Wollen Sie sich für diese Impfung in ${this.vaccination.location.title} wirklich anmelden? Wir möchten Sie an dieser Stelle darauf hinweisen, dass der Impftermin wahrgenommen werden muss!`;
        //console.log(new Date(this.vaccination.date));
        //console.log(new Date());
        // console.log(this.vaccinationCompleted);
      });
    console.log('observer registered');
  }

  removeVaccination(answer) {
    // if (confirm(`Möchten Sie die Impfung in ${this.vaccination.location.title} (ID: ${this.vaccination.id}) wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden!`)) {
    if (answer) {
      this.vs.removeVaccinationByID(this.vaccination.id)
        .subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }

  registerUserForVaccination(answer) {
    if (answer) {
      this.us.registerUserForVaccination(this.currentUser.sv_nr, this.vaccination.id)
        .subscribe(res => console.log(res));
    }
  }

  openDeletePopup(e) {
    e.preventDefault();
    this.deletePopupOpen = true;
  }

  openRegisterPopup(e) {
    e.preventDefault();
    this.registerPopupOpen = true;
  }

  getDeletePopupAnswer(answer) {
    this.deletePopupOpen = false;
    this.removeVaccination(answer);
  }

  getRegisterPopupAnswer(answer) {
    this.registerPopupOpen = false;
    this.registerUserForVaccination(answer);
  }

  adminIsLoggedIn() {
    return this.authService.adminIsLoggedIn();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isVaccinated() {
    console.log('VACC: ' + String(this.currentUser.vaccinated) === '1');
    return (String(this.currentUser.vaccinated) === '1');
  }

  getCurrentUser() {
    if (this.isLoggedIn()) {
      this.us.getUserBySVNR(this.authService.getCurrentUserSVNR()).subscribe((u) => {
        u != null ? this.currentUser = u : this.currentUser = null;
      });
    }
  }
}
