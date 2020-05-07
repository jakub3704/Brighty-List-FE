import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../security/service/authentication.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  hide = true;
  username: string;
  password: string;

  constructor(public authenticationService: AuthenticationService) { }

  userNameControl = new FormControl('', [
    Validators.required,
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyFormErrorStateMatcher();

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  logIn() {
    this.authenticationService.retriveToken( this.username, this.password );
  }

  logOut() {
    this.authenticationService.closeSesion();
  }

}

