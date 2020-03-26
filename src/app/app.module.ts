import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { appRouting } from './routing.module';
import { brightyTranslateModule } from './brighty-translate.module';

import { HomeComponent } from './component/home/home.component';
import { IndexComponent } from './component/index/index.component';
import { PageNotFoundComponent } from './component/pagenotfound/pagenotfound.component';
import { TaskComponent } from './task/component/task/task.component';

import { LogInComponent } from './security/component/login/login.component';
import { SignUpComponent } from './security/component/signup/signup.component';
import { ForgottenPasswordComponent } from './security/component/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './security/component/reset-password/reset-password.component';

import { HeaderComponent } from './component/fragments/header/header.component';
import { FooterComponent } from './component/fragments/footer/footer.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IndexComponent,
    LogInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ForgottenPasswordComponent,
    TaskComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,

    appRouting,
    brightyTranslateModule,

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
