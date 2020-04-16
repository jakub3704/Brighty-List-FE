import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/user/service/user.service';
import { SignUpUserDto } from 'src/app/user/model/sign-up-user-dto';
import { AuthenticationService } from '../../service/authentication.service';
import { MatStepper } from '@angular/material/stepper';
import { equalValidator } from 'src/app/validators/equal-validator';

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
  public matcher = new MyErrorStateMatcher();

  constructor(
    private userServive: UserService,
    public authenticationService: AuthenticationService
    ) { }

    @ViewChild('stepper') stepper: MatStepper;

    nextClicked(event) {
      this.stepper.selected.completed = true;
      this.stepper.next();
    }

    ngOnInit(): void {
    }

  public submit(): void {
    this.userServive.signUpUser(this.user)
                    .subscribe(data=>{data=this.user;});   
    this.authenticationService.retriveToken(this.user.name, this.user.password);
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface FormModel {
  captcha?: string;
}