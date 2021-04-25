import { Component, OnInit } from '@angular/core';
import {Vaccination} from '../../shared/vaccination';
import {VaccinationService} from '../../services/vaccination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  vaccinations: Vaccination[] = [];

  constructor(private vs: VaccinationService) { }

  ngOnInit(): void {
    this.vs.getAllUpcomingVaccinations()
      .subscribe(res => this.vaccinations = res);
  }

}
