import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  svnr: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  adminIsLoggedIn() {
    return this.authService.adminIsLoggedIn();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getCurrentUserSVNR() {
    return this.authService.getCurrentUserSVNR();
  }
}
