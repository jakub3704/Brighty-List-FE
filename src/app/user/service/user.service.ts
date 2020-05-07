import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../model/user-dto';
import { AuthenticationService } from '../../security/service/authentication.service';
import { environment } from '../../../environments/environment';
import { SignUpUserDto } from '../model/sign-up-user-dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  public async signUpUser(user: SignUpUserDto){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    return await this.httpClient.post<SignUpUserDto>(this.backEndUrl + 'signup', user, { headers: httpHeaders }).toPromise();
  }

  public async getUserDetails(): Promise<UserDto> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.get<UserDto>(this.backEndUrl + 'users/details', { headers: httpHeaders }).toPromise();
  }

  public async changeName(name: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.put(this.backEndUrl + 'users/name', name, { headers: httpHeaders }).toPromise();
  }

  public async changeEmail(email: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.put(this.backEndUrl + 'users/email', email, { headers: httpHeaders }).toPromise();
  }

  public async updatePassword(passwordOld: string, passwordNew: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.put(this.backEndUrl + 'users/password',
      { passwordOld: passwordOld, passwordNew: passwordNew },
      { headers: httpHeaders }).toPromise();
  }

  public async deleteUser(password: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.post(this.backEndUrl + 'users/delete', password, { headers: httpHeaders }).toPromise();
  }

  public async getResetPasswordLink(email: string){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    });
    return await this.httpClient.post(this.backEndUrl + 'reset', email, { headers: httpHeaders }).toPromise();
  }

  public async validateResetPasswordLink(token: string){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    });
    return await this.httpClient.get(this.backEndUrl + 'reset?token=' + token, { headers: httpHeaders }).toPromise();
  }

  public async resetPassword(token: string, password: string){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    });
    return await this.httpClient.put(this.backEndUrl + 'reset?token=' + token, password, { headers: httpHeaders }).toPromise();
  }
}
