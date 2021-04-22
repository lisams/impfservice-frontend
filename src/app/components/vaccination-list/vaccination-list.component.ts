import {Component, OnInit} from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';

@Component({
  selector: 'app-vaccination-list',
  templateUrl: './vaccination-list.component.html'
})
export class VaccinationListComponent implements OnInit {

  vaccinations: Vaccination[] = [];
  filterOptions: string[];
  currentFilter = 'Alle Impfungen';

  constructor(private vs: VaccinationService) {
  }

  ngOnInit(): void {
    this.filterOptions = [
      'Alle Impfungen',
      'Alle Anstehende Impfungen',
      'Anstehende Impfungen mit freien Plätzen'
    ];
    console.log(this.currentFilter);

    if (this.currentFilter == 'Alle Impfungen') {
      // asynchron
      this.vs.getAllVaccinations()
        .subscribe(res => this.vaccinations = res);
      console.log('observer registered');
    }
  }

  filter():void {
  console.log(this.currentFilter);
    if(this.currentFilter == 'Alle Anstehende Impfungen') {
      this.vs.getAllUpcomingVaccinations()
        .subscribe(res => this.vaccinations = res);
    } else if(this.currentFilter === 'Anstehende Impfungen mit freien Plätzen') {
      this.vs.getAllUpcomingVaccinationsWithOpenSlots()
        .subscribe(res => this.vaccinations = res);
    } else {
      this.vs.getAllVaccinations()
        .subscribe(res => this.vaccinations = res);
    }
  }

}
