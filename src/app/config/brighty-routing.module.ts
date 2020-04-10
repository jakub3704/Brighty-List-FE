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

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotten', component: ForgottenPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'userSettings', component: UserSettingsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BrightyRoutingModule {

}
