import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToUserGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert("Bitte einloggen für Admin Bereich");

      console.log(state);
      this.router.navigate(["../"], { relativeTo: this.route });
      return false;
    }
  }
}
