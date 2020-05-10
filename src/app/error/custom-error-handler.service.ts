import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../security/service/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService {
  isTokenRefreshing = false;
  constructor(private authenticationService: AuthenticationService,
    private httpClient: HttpClient) { }

  async handle(error: HttpErrorResponse): Promise<any> {
    console.log('CustomErrorHandlerService - handle() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');

    if (error.status === 401) {
      this.isTokenRefreshing = true;
      return await this.authenticationService.refreshToken().then(
        data => {
          this.authenticationService.updateToken(data);
          this.authenticationService.isLoggedIn = true;
          this.authenticationService.isInvalid = false;
        },
        error => {
          this.authenticationService.isInvalid = true;
          this.authenticationService.closeSesion();
          return Observable.throw(error);
        }
      )
    } else {
      this.authenticationService.closeSesion();
      return Observable.throw(error);
    }
  }
}
