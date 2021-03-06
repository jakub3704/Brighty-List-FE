import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SignUpUserDto } from '../model/sign-up-user-dto';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient) {}

  public async signUpUser(user: SignUpUserDto) {
    return await this.httpClient.post(this.backEndUrl + 'signup', user).toPromise();
  }

  public async isSignUpPossible(): Promise<boolean> {
    return await this.httpClient.get<boolean>(this.backEndUrl + 'signup').toPromise();
  }
}
