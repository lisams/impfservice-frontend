import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vaccination} from '../shared/vaccination';
import {catchError, retry} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api = 'https://impfservice.s1810456032.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setLocalStorage(token: string) {
    console.log('storing token');
    console.log(jwt_decode(token));

    const decodedToken = jwt_decode(token);

    localStorage.setItem('token', token);
    // @ts-ignore
    localStorage.setItem('userId', decodedToken.user.id);
  }

  public getCurrentUserId() {
    return Number.parseInt(sessionStorage.getItem('userId'));
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    console.log('logged out!');
  }

  public isLoggedIn() {
    if (sessionStorage.getItem('token')) {
      let token: string = sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log('token expired');
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

}
