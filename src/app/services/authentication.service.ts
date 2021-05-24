import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

interface Token {
  exp: number;
  user: {
    id: string;
    svnr: string;
    admin: string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private api = 'https://impfservice.s1810456032.student.kwmhgb.at/api';

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(email: string, password: string) {
    return this.http.post(`${this.api}/auth/login`, {
      email: email,
      password: password
    });
  }

  public setLocalStorage(token: string) {
    console.log('storing stoken');

    const decodedToken = jwt_decode(token) as Token;
    console.log(decodedToken.user.id);
    sessionStorage.setItem('token', token);
    // TODO user object anlegen
    // sessionStorage.setItem('userId', decodedToken.user.id);
    // sessionStorage.setItem('svnr', decodedToken.user.svnr);
    // sessionStorage.setItem('admin', decodedToken.user.admin);
    // console.log(decodedToken);

    this.router.navigate(['/profil']);
  }

  public getCurrentUserId() {
    // let user = new User()
    return Number.parseInt(sessionStorage.getItem('userId'));
  }

  public getCurrentUser() {
    // TODO return curr user
  }

  public getCurrentUserSVNR() {
    let decodedToken = jwt_decode(sessionStorage.getItem('token')) as Token;
    return decodedToken.user.svnr;
  }

  public getCurrentUserVaccinationStatus() {
    let decodedToken = jwt_decode(sessionStorage.getItem('token')) as Token;
    // return decodedToken.user.;
    // TODO
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('svnr');
    console.log('logged out');
    this.router.navigate(['/login']);
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

  public adminIsLoggedIn() {
    if (sessionStorage.getItem('token')) {
      let token: string = sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;

      let expirationDate: Date = new Date(0);
      let isAdmin : any = decodedToken.user.admin;
      expirationDate.setUTCSeconds(decodedToken.exp);

      if (expirationDate > new Date() && isAdmin === 1) {
        return true;
      } else if (expirationDate < new Date()) {
        sessionStorage.removeItem('token');
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

}
