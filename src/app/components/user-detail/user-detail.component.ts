import {Component, OnInit} from '@angular/core';
import {Vaccination} from '../../shared/vaccination';
import {User} from '../../shared/user';
import {VaccinationService} from '../../services/vaccination.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Popup} from '../../shared/popup';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  user: User = null;
  vaccination: Vaccination;
  daysUntilVaccination: number = null;

  popupConfirmVaccinationStateChange : Popup = new Popup(
    'Impfstatus wirklich ändern?',
    'Soll der Impfstatus wirklich geändert werden?',
    'Bestätigen');

  constructor(
    private vs: VaccinationService,
    private us: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.us.getUserBySVNR(params.svnr)
      .subscribe((u) => {
        this.user = u;
        this.popupConfirmVaccinationStateChange.text = `Hiermit bestätigen Sie, dass sich der Impfstatus von ${this.user.firstname} ${this.user.lastname} geändert hat. Sind Sie sicher?`;
        if (this.user.vaccination_id) {
          this.vs.getVaccinationByID(u.vaccination_id)
            .subscribe((vacc) => {
              this.vaccination = vacc;
              this.daysUntilVaccination = Math.round((new Date(this.vaccination.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            });
        }
      });

    console.log('observer registered');
  }

  changeVaccinationStatus(answer) {
    if (answer) {
      this.us.updateUserStatusBySVNR(this.user.sv_nr).subscribe(() => {
          this.us.getUserBySVNR(this.user.sv_nr).subscribe((user) => {
            this.user.vaccinated = user.vaccinated;

            /*this.router.navigate(['../../impfungen', this.vaccination.id], {
              relativeTo: this.route
            });*/
          });
        },
        err => {
          console.log('Fehler ist passiert', err);
        });
    } else {
      return;
    }
  }

  openPopup(e) {
    e.preventDefault();
    this.popupConfirmVaccinationStateChange.isVisible = true;
  }

  getPopupAnswer(answer) {
    this.popupConfirmVaccinationStateChange.isVisible = false;
    this.changeVaccinationStatus(answer);
  }

  adminIsLoggedIn() {
    return this.authService.adminIsLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }

}
