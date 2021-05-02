import {Injectable} from '@angular/core';
import {Vaccination} from '../shared/vaccination';
import {Location} from '../shared/location';
import {User} from '../shared/user';
import {Address} from '../shared/address';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  private api = 'https://impfservice.s1810456032.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAllVaccinations(): Observable<Array<Vaccination>> {
    return this.http.get(`${this.api}/vaccinations`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllUpcomingVaccinations(): Observable<Array<Vaccination>> {
    return this.http.get(`${this.api}/vaccinations/upcoming`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllUpcomingVaccinationsWithOpenSlots(): Observable<Array<Vaccination>> {
    return this.http.get(`${this.api}/vaccinations/openslots`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getVaccinationByID(id: number): Observable<Vaccination> {
    return this.http.get(`${this.api}/vaccination/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeVaccinationByID(id: number) : Observable<any> {
    return this.http.delete(`${this.api}/vaccination/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createVaccination(vaccination: Vaccination) : Observable<any> {
    return this.http.post(`${this.api}/vaccination`, vaccination)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateVaccinationByID(vaccination: Vaccination) : Observable<any> {
    return this.http.put(`${this.api}/vaccination/${vaccination.id}`, vaccination)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
