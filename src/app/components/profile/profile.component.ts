import { Component, OnInit } from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../shared/user';
import {Vaccination} from '../../shared/vaccination';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = null;
  vaccination: Vaccination;
  daysUntilVaccination: number = null;

  constructor(
    private vs: VaccinationService,
    private us: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {


    this.us.getUserBySVNR(this.authService.getCurrentUserSVNR()).subscribe((u) => {
      this.user = u;
      if (this.user.vaccination_id) {
        this.vs.getVaccinationByID(u.vaccination_id)
          .subscribe((vacc) => {
            this.vaccination = vacc;
            this.daysUntilVaccination = Math.round((new Date(this.vaccination.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
          });
      }
    });

   // const params = this.route.snapshot.params;
   /* this.us.getUserBySVNR(params.svnr)
      .subscribe((u) => {
        this.user = u;
        if (this.user.vaccination_id) {
          this.vs.getVaccinationByID(u.vaccination_id)
            .subscribe((vacc) => {
              this.vaccination = vacc;
              this.daysUntilVaccination = Math.round((new Date(this.vaccination.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            });
        }
      });*/
  }

  adminIsLoggedIn() {
    return this.authService.adminIsLoggedIn();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }

}
