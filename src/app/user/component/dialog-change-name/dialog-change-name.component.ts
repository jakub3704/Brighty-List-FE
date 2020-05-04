import { Component, OnInit, Inject } from '@angular/core';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from '../../model/user-dto';

@Component({
  selector: 'app-dialog-change-name',
  templateUrl: './dialog-change-name.component.html',
  styleUrls: ['./dialog-change-name.component.scss']
})
export class DialogChangeNameComponent implements OnInit {

  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  public matcher = new MyFormErrorStateMatcher();

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<DialogChangeNameComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UserDto) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.userService.changeName(this.nameControl.value).then(
      () => {
        this.userService.getUserDetails().then(data => {
          this.dialogRef.close(data);
        });
      });
  }

}
