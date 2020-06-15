import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { equalValidator } from 'src/app/validators/equal-validator';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {
  isSubmited = false;
  isInvalid = false;
  hideCurrent = true;
  hideNew = true;
  hideReapet = true;

  formModel: FormModel = {};

  passwordCurrentControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)
  ]);

  passwordNewControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)
  ]);

  passwordReapetControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    equalValidator(this.passwordNewControl)
  ]);

  public matcher = new MyFormErrorStateMatcher();

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>) {
    dialogRef.disableClose = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.userService.updatePassword(this.passwordCurrentControl.value, this.passwordNewControl.value).then(
      result=>{
      this.dialogRef.close();
      window.location.reload()
    },
    error => {
      this.isInvalid = true;
    });
  }

  ngOnInit(): void {
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}

export interface FormModel {
  captcha?: string;
}
