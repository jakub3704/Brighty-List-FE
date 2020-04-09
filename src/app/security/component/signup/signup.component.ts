import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { UserDto } from 'src/app/user/model/user-dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements OnInit {
  userDto: UserDto;
  isEditable = false;
  emailFormGroup: FormGroup;
  dataFormGroup: FormGroup;
  termsFormGroup: FormGroup;
  clickMessage = '';

  public formModel: FormModel = {};
  public matcher = new MyErrorStateMatcher();

  constructor(private signupFormBuilder: FormBuilder) { }

  ngOnInit() {
    this.emailFormGroup = this.signupFormBuilder.group({
      email: ['', Validators.required, Validators.email]
    });
    this.dataFormGroup = this.signupFormBuilder.group({
      userName: ['', Validators.required, Validators.maxLength(10)],
      password: ['', Validators.required, Validators.maxLength(30)],
      passwordReapeted: ['', Validators.required, Validators.maxLength(30)]
    });
    this.termsFormGroup = this.signupFormBuilder.group({
      termsControl: ['', Validators.required]
    });
  }

 onClickMe() {
    this.clickMessage = 'You are my hero!';
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
