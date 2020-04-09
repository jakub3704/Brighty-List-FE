import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component';
import { PageNotFoundComponent } from '../component/pagenotfound/pagenotfound.component';

import { LogInComponent } from '../security/component/login/login.component';
import { SignUpComponent } from '../security/component/signup/signup.component';
import { ForgottenPasswordComponent } from '../security/component/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from '../security/component/reset-password/reset-password.component';

import { UserSettingsComponent } from '../user/component/user-settings/user-settings.component';

import { TasksComponent } from '../task/component/tasks/tasks.component';

import { DialogUpdateTaskComponent } from '../task/component/dialog-update-task/dialog-update-task.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'pageNotFound', component: PageNotFoundComponent },

  { path: 'logIn', component: LogInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'forgotten', component: ForgottenPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },

  { path: 'userSettings', component: UserSettingsComponent },

  { path: 'tasks', component: TasksComponent },

  { path: 'test', component: DialogUpdateTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BrightyRoutingModule {

}

