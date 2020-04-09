import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from '../../model/user-dto';
import { UserService } from '../../service/user.service';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  userDto: UserDto;
  isGeneral = true;

  passwordCurrent: string;
  passwordNew: string;

  constructor(private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(data => this.userDto = data);
  }

  openDialogChangePassword(): void {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '400px',
      data: {
        passwordCurrent: this.passwordCurrent,
        passwordNew: this.passwordNew
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.passwordNew = result;
    });
  }
}
