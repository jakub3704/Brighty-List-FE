import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient) {}

  public async getResetPasswordLink(email: string){
    return await this.httpClient.post(this.backEndUrl + 'reset', email).toPromise();
  }

  public async validateResetPasswordLink(token: string){
    return await this.httpClient.get(this.backEndUrl + 'reset?token=' + token).toPromise();
  }

  public async resetPassword(token: string, password: string){
    return await this.httpClient.put(this.backEndUrl + 'reset?token=' + token, password).toPromise();
  }

  public async isResetTokenDisabled(): Promise<boolean>{
    return await this.httpClient.get<boolean>(this.backEndUrl + 'reset/isResetTokenDisabled').toPromise();
  }

}
