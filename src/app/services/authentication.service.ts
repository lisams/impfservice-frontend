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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public login(email: string, password: string) {
    return this.http.post(`${this.api}/auth/login`, {
      email: email,
      password: password
    });
  }

  public logout() {
    this.http.post(`${this.api}/auth/logout`, {});
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public setLocalStorage(token: string) {
    sessionStorage.setItem('token', token);
    const decodedToken = jwt_decode(token) as Token;
    this.router.navigate(['/profil']);
  }

  public getCurrentUserSVNR() {
    let decodedToken = jwt_decode(sessionStorage.getItem('token')) as Token;
    return decodedToken.user.svnr;
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
    }
    return false;
  }

  public adminIsLoggedIn() {
    if (sessionStorage.getItem('token')) {
      let token: string = sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;

      let expirationDate: Date = new Date(0);
      let isAdmin: any = decodedToken.user.admin;
      expirationDate.setUTCSeconds(decodedToken.exp);

      if (expirationDate > new Date() && isAdmin === 1) {
        return true;
      } else if (expirationDate < new Date()) {
        sessionStorage.removeItem('token');
        return false;
      }
      return false;
    }
    return false;
  }
}
