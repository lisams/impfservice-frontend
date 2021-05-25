import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService} from '../services/authentication.service';
import {Popup} from '../shared/popup';
import {AlertPopupComponent} from '../components/alert-popup/alert-popup.component';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.adminIsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["../login"])
      return false;
    }
  }
}
