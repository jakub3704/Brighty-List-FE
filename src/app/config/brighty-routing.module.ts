import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component';
import { PageNotFoundComponent } from '../component/pagenotfound/pagenotfound.component';

import { LogInComponent } from '../security/component/login/login.component';
import { SignupComponent } from '../security/component/signup/signup.component';
import { ForgottenPasswordComponent } from '../security/component/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from '../security/component/reset-password/reset-password.component';

import { UserSettingsComponent } from '../user/component/user-settings/user-settings.component';

import { TasksComponent } from '../task/component/tasks/tasks.component';
import { AuthRouteGuardService} from '../security/service/auth-route-guard.service';
import { LoggedUserGuardService} from '../security/service/logged-user-guard.service';
import { AboutComponent } from '../component/about/about.component';
import { PrivacyComponent } from '../component/privacy/privacy.component';
import { HelpComponent } from '../component/help/help.component';
import { TermsComponent } from '../component/terms/terms.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent, canActivate: [LoggedUserGuardService]},
  { path: 'signup', component: SignupComponent, canActivate: [LoggedUserGuardService] },
  { path: 'forgotten', component: ForgottenPasswordComponent, canActivate: [LoggedUserGuardService] },
  { path: 'reset', component: ResetPasswordComponent, canActivate: [LoggedUserGuardService] },
  { path: 'userSettings', component: UserSettingsComponent, canActivate: [AuthRouteGuardService] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthRouteGuardService]},
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BrightyRoutingModule {

}
