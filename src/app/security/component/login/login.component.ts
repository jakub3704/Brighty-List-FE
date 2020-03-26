import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../security/service/authentication.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  validatorUserNameControl = new FormControl('', [
    Validators.required,
  ]);

  validatorPasswordControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

  logIn() {
    this.authenticationService.retriveToken( this.username, this.password );
    this.router.navigate(['/index']);
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
