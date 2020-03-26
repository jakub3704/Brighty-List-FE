import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements OnInit {
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
      emailControl: ['', Validators.required]
    });
    this.dataFormGroup = this.signupFormBuilder.group({
      usernameControl: ['', Validators.required],
      passwordControl: ['', Validators.required],
      passwordTwoControl: ['', Validators.required]
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
