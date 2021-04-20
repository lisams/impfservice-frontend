import {Component, OnInit} from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vaccination-detail',
  templateUrl: './vaccination-detail.component.html'
})
export class VaccinationDetailComponent implements OnInit {

  vaccination: Vaccination;

  constructor(
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.vs.getSingle(params.id)
      .subscribe(v => this.vaccination = v);
    console.log('observer registered');
  }
}
