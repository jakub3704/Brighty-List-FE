import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {
  isSubmited = false;

  passwordNew: string;
  passwordOld: string;

  dataFormGroup: FormGroup;
  formModel: FormModel = {};

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    private dialogFormBuilder: FormBuilder) {
    dialogRef.disableClose = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    if (this.userService.updatePassword(this.passwordOld, this.passwordNew)) {
      this.dialogRef.close();
    } else {
      // TODO sth gone wrong
    }
  }

  ngOnInit(): void {
    this.dataFormGroup = this.dialogFormBuilder.group({
      passwordOldControl: ['', Validators.required],
      passwordNewControl: ['', Validators.required],
      passwordNewReapetControl: ['', Validators.required]
    });
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}

export interface FormModel {
  captcha?: string;
}
