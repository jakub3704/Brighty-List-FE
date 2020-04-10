import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/user/service/user.service';
import { SignUpUserDto } from 'src/app/user/model/sign-up-user-dto';
import { AuthenticationService } from '../../service/authentication.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user = new SignUpUserDto();

//TODO validation min max signs
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameControl = new FormControl('', [
    Validators.required,
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
  ]);

  passwordReapetControl = new FormControl('', [
    Validators.required,
  ]);

  termsControl = new FormControl('', [
    Validators.required,
  ]);

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
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

