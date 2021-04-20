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

  private api = 'http://impfservice.s1810456032.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAllVaccinations(): Observable<Array<Vaccination>> {
    return this.http.get(`${this.api}/vaccinations`)
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

  getUserBySVNR(svnr: string): Observable<User> {
    return this.http.get(`${this.api}/user/${svnr}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
