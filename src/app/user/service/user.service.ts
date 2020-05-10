import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserDto } from '../model/user-dto';
import { AuthenticationService } from '../../security/service/authentication.service';
import { environment } from '../../../environments/environment';
import { CustomErrorHandlerService } from 'src/app/error/custom-error-handler.service';


@Injectable({ providedIn: 'root' })
export class UserService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    private customErrorHandlerService: CustomErrorHandlerService) {
  }

  public async getUserDetails(): Promise<UserDto> {
    var resultUserDto: UserDto;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.getUserDetailsToPromise().then(
      data => {
        resultUserDto = data;
        console.log('TaskService - getUserDetails() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - getUserDetails() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.getUserDetailsToPromise().then(
        data => {
          resultUserDto = data;
          console.log('TaskService - getUserDetails() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - getUserDetails() | RETRY ERROR | ' + error.status + ' | '  + new Date().toISOString() + ' |');
        });
    }
    return await resultUserDto;
  }

  public async changeName(name: string): Promise<UserDto> {
    var resultUserDto: UserDto;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.changeNameToPromise(name).then(
      data => {
        resultUserDto = data;
        console.log('TaskService - changeName() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - changeName() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.changeNameToPromise(name).then(
        data => {
          resultUserDto = data;
          console.log('TaskService - changeName() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - changeName() | RETRY ERROR | ' + error.status + ' | '  + new Date().toISOString() + ' |');
        });
    }
    return await resultUserDto;
  }

  public async changeEmail(email: string): Promise<UserDto> {
    var resultUserDto: UserDto;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.changeEmailToPromise(email).then(
      data => {
        resultUserDto = data;
        console.log('TaskService - changeEmail() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - changeEmail() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.changeEmailToPromise(email).then(
        data => {
          resultUserDto = data;
          console.log('TaskService - changeEmail() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - changeEmail() | RETRY ERROR | ' + error.status + ' | '  + new Date().toISOString() + ' |');
        });
    }
    return await resultUserDto;
  }

  public async updatePassword(passwordOld: string, passwordNew: string): Promise<UserDto> {
    var resultUserDto: UserDto;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.updatePasswordToPromise(passwordOld, passwordNew).then(
      data => {
        resultUserDto = data;
        console.log('TaskService - updatePassword() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - updatePassword() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.updatePasswordToPromise(passwordOld, passwordNew).then(
        data => {
          resultUserDto = data;
          console.log('TaskService - updatePassword() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - updatePassword() | RETRY ERROR | ' + error.status + ' | '  + new Date().toISOString() + ' |');
        });
    }
    return await resultUserDto;
  }

  public async deleteUser(password: string) {
    var isError = false;
    var myError: HttpErrorResponse;
    await this.deleteUserToPromise(password).then(
      data => {
        console.log('TaskService - updatePassword() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - updatePassword() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.deleteUserToPromise(password).then(
        data => {
          console.log('TaskService - updatePassword() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - updatePassword() | RETRY ERROR | ' + error.status + ' | '  + new Date().toISOString() + ' |');
        });
    }
  }

  public async getUserDetailsToPromise(): Promise<UserDto> {
    return await this.httpClient.get<UserDto>(this.backEndUrl + 'users/details', { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async changeNameToPromise(name: string) {
    return await this.httpClient.put<UserDto>(this.backEndUrl + 'users/name', name, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async changeEmailToPromise(email: string) {
    return await this.httpClient.put<UserDto>(this.backEndUrl + 'users/email', email, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async updatePasswordToPromise(passwordOld: string, passwordNew: string) {
    return await this.httpClient.put<UserDto>(this.backEndUrl + 'users/password',
      { passwordOld: passwordOld, passwordNew: passwordNew }, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async deleteUserToPromise(password: string) {
    return await this.httpClient.post(this.backEndUrl + 'users/delete', password, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

}
