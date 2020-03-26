import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { IndexComponent } from './component/index/index.component';
import { PageNotFoundComponent } from './component/pagenotfound/pagenotfound.component';
import { TaskComponent } from './task/component/task/task.component';

import { LogInComponent } from './security/component/login/login.component';
import { SignUpComponent } from './security/component/signup/signup.component';
import { ForgottenPasswordComponent } from './security/component/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './security/component/reset-password/reset-password.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'index', component: IndexComponent },
    { path: 'pageNotFoundComponent', component: PageNotFoundComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LogInComponent },
    { path: 'reset', component: ResetPasswordComponent },
    { path: 'forgotten', component: ForgottenPasswordComponent },
    { path: 'tasks', component: TaskComponent },
    // otherwise redirect to home
    { path: '**', component: HomeComponent }
];

export const appRouting = RouterModule.forRoot(routes, { enableTracing: true });
