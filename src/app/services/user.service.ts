import {Injectable} from '@angular/core';
import {User} from '../shared/user';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Vaccination} from '../shared/vaccination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'https://impfservice.s1810456032.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getUserBySVNR(svnr: string): Observable<User> {
    return this.http.get(`${this.api}/user/${svnr}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateUserBySVNR(user: User) : Observable<any> {
    return this.http.put(`${this.api}/user/${user.sv_nr}`, user)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateUserStatusBySVNR(svnr: string) : Observable<any> {
    return this.http.put(`${this.api}/user/status/${svnr}`, svnr)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  registerUserForVaccination(svnr: string, vaccId: number) {
    return this.http.put(`${this.api}/user/register/${svnr}/${vaccId}`, [svnr, vaccId])
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
