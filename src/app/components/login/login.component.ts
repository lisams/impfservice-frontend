import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginErrorMessages} from './login-error-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  errors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]]
    });
    this.updateErrorMessages();
  }

  updateErrorMessages() {
    console.log("form invalid? " + this.loginForm.invalid);

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

  }

}
