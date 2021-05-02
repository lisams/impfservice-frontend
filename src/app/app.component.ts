import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'impfservice-frontend';

  constructor (private authService : AuthenticationService) { }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

 /* getLoginLabel() {
    return this.isLoggedIn() ? "Logout" : "Login";
  }*/
}
