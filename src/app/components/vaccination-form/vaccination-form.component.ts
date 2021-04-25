import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';
import {FormBuilder, FormControl, FormArray, FormGroup, Validators} from '@angular/forms';
import {VaccinationFactory} from '../../shared/vaccination-factory';
import {VaccinationValidators} from '../../shared/vaccination-validators';
import {VaccinationFormErrorMessage} from './vaccination-form-error-messages';

@Component({
  selector: 'app-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.scss']
})
export class VaccinationFormComponent implements OnInit {

  vaccinationForm: FormGroup;
  isUpdatingVaccination = false;
  vaccination = VaccinationFactory.empty();
  locationForm: FormGroup;
  addressForm: FormGroup;
  errors: { [key: string]: string } = {};
  datePlaceholder : string = 'TT.MM.JJJJ'


  constructor(
    private fb: FormBuilder,
    private vs: VaccinationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.safariFormBugfix();

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

    this.vaccinationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
    this.locationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
    this.addressForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
  }

  initVaccination() {
    this.buildAddressGroup();
    this.buildLocationGroup();

    document.getElementsByTagName('input')[0].placeholder = 'new text for email';


    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      date: [this.vaccination.date,
        [
          Validators.required,
          VaccinationValidators.checkDate,
          Validators.pattern('[0-9]+.*[0-9]+.*[0-9]+')
        ]
      ],
      start: [this.vaccination.start,
        [
          Validators.required,
          Validators.pattern('[0-2][0-9]:[0-6][0-9]')
        ]
      ],
      end: [this.vaccination.end,
        [
          Validators.required,
          Validators.pattern('[0-2][0-9]:[0-6][0-9]')
        ]
      ],
      max_participants: [this.vaccination.max_participants,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ]
      ],
      location_id: this.vaccination.location_id,
      location: this.locationForm.value
    });
  }

  buildLocationGroup() {
    this.locationForm = this.fb.group({
      id: this.vaccination.location.id,
      title: [this.vaccination.location.title, Validators.required],
      description: this.vaccination.location.description,
      address: this.addressForm
    });
  }

  buildAddressGroup() {
    this.addressForm = this.fb.group({
      id: this.vaccination.location.address.id,
      street_address: [this.vaccination.location.address.street_address, Validators.required],
      zip_code: [this.vaccination.location.address.zip_code,
        [
          Validators.required,
          Validators.pattern('[0-9][0-9][0-9][0-9]')
        ]
      ],
      city: [this.vaccination.location.address.city, Validators.required]
    });
  }

  submitForm() {
    const vaccination: Vaccination = VaccinationFactory.fromObject(this.vaccinationForm.value);
    vaccination.location = this.locationForm.value;
    vaccination.location.address = this.addressForm.value;

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

  updateErrorMessages() {
    console.log('form invalid? ' + this.vaccinationForm.invalid);

    this.errors = {};

    for (const message of VaccinationFormErrorMessage) {
      const controlVaccination = this.vaccinationForm.get(message.forControl);
      if (
        controlVaccination && controlVaccination.dirty && controlVaccination.invalid
        && controlVaccination.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }

      const controlLocation = this.locationForm.get(message.forControl);
      if (
        controlLocation && controlLocation.dirty && controlLocation.invalid
        && controlLocation.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }

      const controlAddress = this.addressForm.get(message.forControl);
      if (
        controlAddress && controlAddress.dirty && controlAddress.invalid
        && controlAddress.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }

  }

  safariFormBugfix () {
    if(navigator.userAgent.toLowerCase().indexOf('safari/') > -1) {
      this.datePlaceholder = "JJJJ-MM-TT";
    }
  }


}
