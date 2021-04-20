import {Component, OnInit} from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';

@Component({
  selector: 'app-vaccination-list',
  templateUrl: './vaccination-list.component.html'
})
export class VaccinationListComponent implements OnInit {

  vaccinations: Vaccination[];

  constructor(private vs: VaccinationService) {
  }

  ngOnInit(): void {
    // asynchron
    this.vs.getAll()
      .subscribe(res => this.vaccinations = res);
    console.log('observer registered');
    this.vs.getSingle(3).subscribe(res => console.log(typeof res.start));
  }

}