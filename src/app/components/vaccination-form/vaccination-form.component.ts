import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {VaccinationService} from '../../services/vaccination.service';
import {Vaccination} from '../../shared/vaccination';

@Component({
  selector: 'app-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.scss']
})
export class VaccinationFormComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    /*const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingVaccination = true;
      this.vs.getSingle(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }

    this.initVaccination();*/
  }

  initVaccination() {

    /*this.buildThumbnailsArray();
    this.bookForm = this.fb.group({
      id: this.book.id,
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [
        this.book.isbn, [
          Validators.required,
        ], this.isUpdatingBook ? null : BookValidators.isbnExists(this.bs)
      ],
      description: this.book.description,
      published: this.book.published,
      rating: [this.book.rating, [Validators.min(0), Validators.max(10)]],
      images: this.images,

    });

    this.bookForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );*/
  }

  submitForm() {


  }

}
