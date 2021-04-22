import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {VaccinationFactory} from '../../shared/vaccination-factory';

/*
* import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from "../shared/book-store.service";
import { BookFormErrorMessages } from "./book-form-error-messages";
import { Book, Image } from "../shared/book";
import { BookValidators} from "../shared/book-validators";
* */

@Component({
  selector: 'app-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.scss']
})
export class VaccinationFormComponent implements OnInit {

  vaccinationForm: FormGroup;
  isUpdatingVaccination = false;
  errors: { [key: string]: string } = {};
  vaccination = VaccinationFactory.empty();
  location: FormGroup;
  address: FormGroup;


  constructor(
    private fb: FormBuilder,
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingVaccination = true;
      this.vs.getVaccinationByID(id).subscribe(vacc => {
        this.vaccination = vacc;
        console.log(vacc);
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    this.buildAddressGroup();
    this.buildLocationGroup();

    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      date: this.vaccination.date,
      start: this.vaccination.start,
      end: this.vaccination.end,
      max_participants: this.vaccination.max_participants,
      location_id: this.vaccination.location_id,
      location: this.location.value
    });
  }

  buildLocationGroup() {
    this.location = this.fb.group({
      id: new FormControl(this.vaccination.location.id),
      title: new FormControl(this.vaccination.location.title),
      description: new FormControl(this.vaccination.location.description),
      address: this.address
    });
  }

  buildAddressGroup() {
    this.address = this.fb.group({
      id: new FormControl(this.vaccination.location.address.id),
      street_address: new FormControl(this.vaccination.location.address.street_address),
      zip_code: new FormControl(this.vaccination.location.address.zip_code),
      city: new FormControl(this.vaccination.location.address.city)
    });
  }

  submitForm() {
    const vaccination: Vaccination = VaccinationFactory.fromObject(this.vaccinationForm.value);
    console.log('OIDA: ' + vaccination.max_participants);
    vaccination.location = this.location.value;
    vaccination.location.address = this.address.value;

    if (this.isUpdatingVaccination) {
      this.vs.updateVaccinationByID(vaccination).subscribe(() => {
          this.router.navigate(['../../impfungen', vaccination.id], {
            relativeTo: this.route
          });
        },
        err => {
          console.log('Fehler ist passiert', err);
        });

    } else {

      this.vs.createVaccination(vaccination).subscribe(() => {

          /** empty factory */
          this.vaccination = VaccinationFactory.empty();
          this.vaccinationForm.reset(VaccinationFactory.empty());

          this.router.navigate(['../impfungen'], {
            relativeTo: this.route
          });

        },
        err => {
          console.log('Fehler ist passiert', err);
        });
    }

  }

}
