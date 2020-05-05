import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { BrightyRoutingModule } from './config/brighty-routing.module';
import { BrightyTranslateModule } from './config/brighty-translate.module';
import { AngularMaterialImportModule } from './config/angular-material-import.module';

import { HeaderComponent } from './component/fragments/header/header.component';
import { FooterComponent } from './component/fragments/footer/footer.component';

import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/pagenotfound/pagenotfound.component';

import { LogInComponent } from './security/component/login/login.component';
import { SignupComponent } from './security/component/signup/signup.component';
import { ForgottenPasswordComponent } from './security/component/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './security/component/reset-password/reset-password.component';

import { UserSettingsComponent } from './user/component/user-settings/user-settings.component';
import { DialogChangePasswordComponent } from './user/component/dialog-change-password/dialog-change-password.component';
import { DialogChangeNameComponent } from './user/component/dialog-change-name/dialog-change-name.component';
import { DialogChangeEmailComponent } from './user/component/dialog-change-email/dialog-change-email.component';

import { TasksComponent } from './task/component/tasks/tasks.component';
import { DialogNewTaskComponent } from './task/component/dialog-new-task/dialog-new-task.component';
import { DialogNewReminderComponent } from './task/component/dialog-new-reminder/dialog-new-reminder.component';
import { DialogDeleteAccountComponent } from './user/component/dialog-delete-account/dialog-delete-account.component';
import { AboutComponent } from './component/about/about.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { CookiesComponent } from './component/fragments/cookies/cookies.component';
import { HelpComponent } from './component/help/help.component';
import { CookiesDialogComponent } from './component/fragments/cookies-dialog/cookies-dialog.component';
import { TermsComponent } from './component/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    HomeComponent,
    PageNotFoundComponent,

    LogInComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgottenPasswordComponent,

    UserSettingsComponent,
    DialogChangePasswordComponent,
    DialogChangeNameComponent,
    DialogChangeEmailComponent,

    TasksComponent,
    DialogNewTaskComponent,
    DialogNewReminderComponent,
    DialogDeleteAccountComponent,
    AboutComponent,
    PrivacyComponent,
    CookiesComponent,
    HelpComponent,
    CookiesDialogComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,

    BrightyRoutingModule,
    BrightyTranslateModule,
    AngularMaterialImportModule,

    NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
