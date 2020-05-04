import { Component, OnInit, Inject } from '@angular/core';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { Validators, FormControl } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from '../../model/user-dto';

@Component({
  selector: 'app-dialog-change-email',
  templateUrl: './dialog-change-email.component.html',
  styleUrls: ['./dialog-change-email.component.scss']
})
export class DialogChangeEmailComponent implements OnInit {

  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  public matcher = new MyFormErrorStateMatcher();

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<DialogChangeEmailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UserDto) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.userService.changeEmail(this.emailControl.value).then(
      () => {
        this.userService.getUserDetails().then(data => {
          this.dialogRef.close(data);
        });
      });
  }
}
