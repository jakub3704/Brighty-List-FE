import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../model/user-dto';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../security/service/authentication.service';
import { environment } from '../../../environments/environment';
import { SignUpUserDto } from '../model/sign-up-user-dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
  }



  public getUserDetails(): Observable<UserDto> {
     const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return this.httpClient.get<UserDto>(this.backEndUrl + 'users/details', { headers: httpHeaders });
  }

  public signUpUser(user: SignUpUserDto) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    return this.httpClient.post<SignUpUserDto>(this.backEndUrl + 'signup', user, { headers: httpHeaders });
  }

  public updatePassword(passwordOld: string, passwordNew: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return this.httpClient.put(this.backEndUrl + 'users',
      { passwordOld, passwordNew },
      { headers: httpHeaders });
      // TODO poprawic
  }

  public deleteUser(userId: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return this.httpClient.delete(this.backEndUrl + 'users/' + userId, { headers: httpHeaders });
  }
}
