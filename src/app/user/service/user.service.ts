import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../model/user-dto';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../security/service/authentication.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
  });

  public getUserDetails(): Observable<UserDto> {
    return this.httpClient.get<UserDto>(this.backEndUrl + 'users/details', { headers: this.httpHeaders });
  }

  public createUser(user: UserDto) {
    return this.httpClient.post(this.backEndUrl + 'users', user, { headers: this.httpHeaders });
  }

  public updatePassword(passwordOld: string, passwordNew: string) {
    return this.httpClient.put(this.backEndUrl + 'users',
      { passwordOld, passwordNew },
      { headers: this.httpHeaders });
      // TODO poprawic
  }

  public deleteUser(userId: string) {
    return this.httpClient.delete(this.backEndUrl + 'users/' + userId, { headers: this.httpHeaders });
  }
}
