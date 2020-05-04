import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from '../../model/user-dto';
import { UserService } from '../../service/user.service';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';
import { DialogChangeNameComponent } from '../dialog-change-name/dialog-change-name.component';
import { DialogChangeEmailComponent } from '../dialog-change-email/dialog-change-email.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/security/service/authentication.service';
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  userDto: UserDto = new UserDto();
  isGeneral = true;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUserDetails().then(
      data => { 
        this.userDto = data;
        window.scroll(0, 0);
      },
      error => {
        this.authenticationService.closeSesion();
        this.router.navigate(['/home']);
      });
  }

  openDialogChangeName(): void {
    const dialogRef = this.dialog.open(DialogChangeNameComponent, {
      width: '400px',
      data: this.userDto
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.userDto = result;
      }
      window.scroll(0, 0);
    });
  }

  openDialogChangeEmail(): void {
    const dialogRef = this.dialog.open(DialogChangeEmailComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.userDto = result;
      }
      window.scroll(0, 0);
    });
  }

  openDialogChangePassword(): void {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      window.scroll(0, 0);
    });
  }

  openDialogDeleteAccount(): void {
    const dialogRef = this.dialog.open(DialogDeleteAccountComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      window.scroll(0, 0);
    });
  }

}
