import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/user/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  errorMessage = '';
  executed = false;
  isError = false;

  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private translate: TranslateService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  getError(): boolean {
    if (this.emailControl.hasError('required')) {
      this.errorMessage = this.translate.instant('form_blank');
      return true;
    }
    if (this.emailControl.hasError('email')) {
      this.errorMessage = this.translate.instant('form_not_email');
      return true;
    }
    if (this.emailControl.invalid) {
      this.errorMessage = 'unknown error';
      return true;
    }
    this.errorMessage = '';
    return false;
  }

  sendRecovery() {
    if (!this.getError()) {
      this.userService.getResetPasswordLink(this.emailControl.value).then(
        result => {
          this.executed = true;
        },
        error => {
          this.executed = true;
          this.isError = true;
        });
    }
  }
}
