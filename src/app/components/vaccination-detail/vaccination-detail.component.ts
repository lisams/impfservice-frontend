import {Component, OnInit} from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';
import {ActivatedRoute, Router} from '@angular/router';
import {VaccinationFactory} from '../../shared/vaccination-factory';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../shared/user';
import {UserService} from '../../services/user.service';
import {Popup} from '../../shared/popup';

@Component({
  selector: 'app-vaccination-detail',
  templateUrl: './vaccination-detail.component.html'
})
export class VaccinationDetailComponent implements OnInit {

  vaccination: Vaccination = null;
  vaccinationCompleted = null;

  popupConfirmDeleteVaccination: Popup = new Popup(
    'Impfung wirklich löschen?',
    'Soll diese Impfung wirklich gelöscht werden?',
    'Löschen'
  );

  popupConfirmRegisterUserForVaccination: Popup = new Popup(
    'Für diese Impfung anmelden?',
    'Für diese Impfung wirklich anmelden?',
    'Verpflichtend anmelden'
  );

  popupConfirmCancelUser: Popup = new Popup(
    'Sind Sie sicher, dass Sie sich abmelden möchten?',
    'Wenn Sie sich abmelden, verzichten Sie auf Ihren Impftermin und müssen sich für einen neues anmelden!',
    'Verpflichtend abmelden'
  );


  popupAlertUserNotLoggedIn: Popup = new Popup(
    'Du bist noch nicht eingeloggt!',
    'Um dich für eine Impfung anzumelden, musst du dich vorher einloggen. Möchtest du dich einloggen?',
    'Jetzt anmelden'
  );
  popupAlertUserNotLoggedInLink: string = '../../login';

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
        this.popupConfirmDeleteVaccination.text = `Soll diese Impfung in ${this.vaccination.location.title} wirklich gelöscht werden? Dieser Schritt kann nicht mehr rückgängen gemacht werden!`;
        this.popupConfirmRegisterUserForVaccination.text = `Wollen Sie sich für diese Impfung in ${this.vaccination.location.title} wirklich anmelden? Wir möchten Sie an dieser Stelle darauf hinweisen, dass der Impftermin wahrgenommen werden muss!`;
        //console.log(new Date(this.vaccination.date));
        //console.log(new Date());
        // console.log(this.vaccinationCompleted);
      });
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
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/profil']);
        });
    }
  }

  cancelUserForVaccination(answer) {
    if(answer) {
      this.us.cancelUserForVaccination(this.currentUser.sv_nr)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/profil']);
        });
    }
  }

  openDeletePopup(e) {
    e.preventDefault();
    this.popupConfirmDeleteVaccination.isVisible = true;
  }

  openRegisterPopups(e) {
    if (this.isLoggedIn()) {
      this.openRegisterConfirmPopup(e);
    } else {
      this.openRegisterAlertPopup();
    }
  }

  openRegisterAlertPopup() {
    this.popupAlertUserNotLoggedIn.isVisible = true;
  }

  openRegisterConfirmPopup(e) {
    e.preventDefault();
    this.popupConfirmRegisterUserForVaccination.isVisible = true;
  }

  openCancelPopup(e) {
    e.preventDefault();
    this.popupConfirmCancelUser.isVisible = true;
  }

  getDeletePopupAnswer(answer) {
    this.popupConfirmDeleteVaccination.isVisible = false;
    this.removeVaccination(answer);
  }

  getRegisterPopupAnswer(answer) {
    this.popupConfirmRegisterUserForVaccination.isVisible = false;
    this.registerUserForVaccination(answer);
  }

  getCancelPopupAnswer(answer) {
    this.popupConfirmCancelUser.isVisible = false;
    this.cancelUserForVaccination(answer);
  }

  closeAlertPopup(answer) {
    this.popupAlertUserNotLoggedIn.isVisible = answer;
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
