import {Component, OnInit} from '@angular/core';
import {Vaccination} from '../../shared/vaccination';
import {User} from '../../shared/user';
import {VaccinationService} from '../../services/vaccination.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;

  constructor(
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.vs.getUserBySVNR(params.svnr)
      .subscribe(u => this.user = u);
    console.log('observer registered');
  }

}
