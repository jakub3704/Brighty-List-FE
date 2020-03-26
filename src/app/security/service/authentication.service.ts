import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenDto } from './token-dto';

const OAUTH_URL = 'http://localhost:7070/oauth/token';
const CLIENT_ID = 'brighty-client';
const CLIENT_SECRET = 'brighty-secret';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    token: TokenDto;

    constructor(private httpClient: HttpClient,
                private coockieService: CookieService) { }

    public retriveToken(username: string, password: string) {
        const httpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            });

        const oAuthBody = new HttpParams()
            .set('username', username)
            .append('password', password)
            .append('grant_type', 'password');

        this.httpClient.post<TokenDto>(
            OAUTH_URL,
            oAuthBody,
            { headers: httpHeaders })
            .subscribe(
                data => {this.token = data,
                         alert(this.token.access_token); },
                error => alert('Invalid Credentials')
            );
//            .subscribe(
//                data => this.saveToken(data),
//                error => alert('Invalid Credentials')
//           );
    }

    saveToken(token: TokenDto) {
        this.coockieService.set('access_token', JSON.stringify(token));
    }

    checkCredentials(): TokenDto {
        return JSON.parse(this.coockieService.get('access_token'));
    }

    closeSesion() {
        this.coockieService.delete('access_token');
    }

}


