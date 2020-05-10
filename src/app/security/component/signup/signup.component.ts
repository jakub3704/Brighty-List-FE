import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { SignUpUserDto } from 'src/app/user/model/sign-up-user-dto';
import { AuthenticationService } from '../../service/authentication.service';
import { MatStepper } from '@angular/material/stepper';
import { equalValidator } from 'src/app/validators/equal-validator';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { SignUpService } from 'src/app/user/service/sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user = new SignUpUserDto();
  hide = true;
  hideReapet = true;

  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)
  ]);

  passwordReapetControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    equalValidator(this.passwordControl)
  ]);

  termsControl = new FormControl('', [
    Validators.required
  ]);

  public formModel: FormModel = {};
  public matcher = new MyFormErrorStateMatcher();

  constructor(
    private signUpService: SignUpService,
    public authenticationService: AuthenticationService
  ) { }

  @ViewChild('stepper') stepper: MatStepper;

  nextClicked(event) {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  public submit(): void {
    this.signUpService.signUpUser(this.user)
      .then(data => { data = this.user; });
    this.authenticationService.retriveToken(this.user.name, this.user.password);
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}

export interface FormModel {
  captcha?: string;
}