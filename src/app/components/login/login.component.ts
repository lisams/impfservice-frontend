import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginErrorMessages} from './login-error-messages';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

interface Response {
  access_token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[aA-zZ])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    });
    this.updateErrorMessages();
  }

  updateErrorMessages() {
    this.loginForm.statusChanges.subscribe(() => {
      console.log('form invalid? ' + this.loginForm.invalid);

      this.errors = {};

      for (const message of LoginErrorMessages) {
        const control = this.loginForm.get(message.forControl);

        if (
          control && control.dirty &&
          control.invalid && control.errors[message.forValidator] &&
          !this.errors[message.forControl]
        ) {
          this.errors[message.forControl] = message.text;
        }
      }
    });
  }

  login() {
    const val = this.loginForm.value;
    console.log(val.email, val.password);
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(
        (res) => {
          console.log(res);
          this.authService.setLocalStorage((res as Response).access_token);
        });
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }

}
