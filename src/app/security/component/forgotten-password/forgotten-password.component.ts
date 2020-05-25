import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/user/service/reset-password.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  errorMessage = '';
  executed = false;
  isError = false;
  isResetTokenDisabled = true;

  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private translate: TranslateService,
    private resetPasswordService: ResetPasswordService,
    private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordService.isResetTokenDisabled().then(
      data => {
        this.isResetTokenDisabled = data
      })
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
      if (!this.isResetTokenDisabled) {
        this.resetPasswordService.getResetPasswordLink(this.emailControl.value).then(
          result => {
            this.executed = true;
          },
          error => {
            this.executed = true;
            this.isError = true;
          });
      } else {
        this.executed = true;
      }
    }
  }
}
