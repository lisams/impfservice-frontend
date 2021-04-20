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
    this.vs.getVaccinationByID(params.id)
      .subscribe(v => this.vaccination = v);
    console.log('observer registered');
  }

  removeVaccination() {
    if (confirm(`Möchten Sie die Impfung in ${this.vaccination.location.title} (ID: ${this.vaccination.id}) wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden!`)) {
      this.vs.removeVaccinationByID(this.vaccination.id)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route }));

    }
  }
}
