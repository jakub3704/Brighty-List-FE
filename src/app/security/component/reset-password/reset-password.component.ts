import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { equalValidator } from 'src/app/validators/equal-validator';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/user/service/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  response: string = 'WAITING';
  token: string= '-----';
  hide = true;
  hideReapet = true;

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)
  ]);

  passwordReapetControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    equalValidator(this.passwordControl)
  ]);

  public matcher = new MyFormErrorStateMatcher();

  constructor(private resetPasswordService: ResetPasswordService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];

      this.resetPasswordService.validateResetPasswordLink(this.token).then(data => {
        if (data) {
          this.response = 'true';
         } else {
          this.response = 'false';
         }
      },
      error => {
        this.response = 'false';
      });
    }); 
  }

  submit(){
    this.resetPasswordService.resetPassword(this.token, this.passwordControl.value).then(()=>
    {
      this.router.navigate(['/login']);
    })
  }

}