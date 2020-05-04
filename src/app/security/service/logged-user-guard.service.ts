import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuardService implements CanActivate{

  constructor(private authenticationService: AuthenticationService,
    public router: Router) { }

    canActivate(): boolean {
    if (this.authenticationService.checkCredentials()) {
      this.router.navigate(['tasks']);
      return false;
    }
    return true;
  }
}
