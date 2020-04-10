import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../security/service/authentication.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  username: string;
  password: string;

  constructor(public authenticationService: AuthenticationService) { }

  userNameControl = new FormControl('', [
    Validators.required,
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

  logIn() {
    this.authenticationService.retriveToken( this.username, this.password );
  }

  logOut() {
    this.authenticationService.closeSesion();
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
