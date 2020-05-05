import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';
import { FormControl, Validators } from '@angular/forms';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { AuthenticationService } from 'src/app/security/service/authentication.service';

@Component({
  selector: 'app-dialog-delete-account',
  templateUrl: './dialog-delete-account.component.html',
  styleUrls: ['./dialog-delete-account.component.scss']
})
export class DialogDeleteAccountComponent implements OnInit {
  hideCurrent = true;
  isInvalid = false;

  formModel: FormModel = {};
  matcher = new MyFormErrorStateMatcher();
  passwordCurrentControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)
  ]);

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>) {
    dialogRef.disableClose = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.userService.deleteUser(this.passwordCurrentControl.value).then(
      result => {
        this.authenticationService.closeSesion();
        this.isInvalid = false;
        this.dialogRef.close();
      },
      error => {
        this.isInvalid = true;
      }
    );
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
