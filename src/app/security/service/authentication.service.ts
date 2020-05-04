import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenDto } from './token-dto';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const CLIENT_ID = 'brighty-client';
const CLIENT_SECRET = 'brighty-secret';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public isLoggedIn: boolean;
    public isInvalid = false;
    token: TokenDto;

    constructor(private httpClient: HttpClient,
                private coockieService: CookieService,
                private router: Router) { 
                this.isLoggedIn = this.checkCredentials();
                }

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
            environment.backEndUrl + 'oauth/token',
            oAuthBody,
            { headers: httpHeaders })
            .subscribe(
                data => {
                    this.saveToken(data);
                    this.isLoggedIn = true;
                    this.isInvalid = false;
                    this.router.navigate(['/tasks']);
                },
                error => {
                    this.isLoggedIn = false;
                    this.isInvalid = true;
            }
            );
    }

    saveToken(token: TokenDto) {
        var expire = new Date(new Date().getTime() + token.expires_in*1000)
        this.coockieService.set('access_token', JSON.stringify(token), expire);
    }

    getToken(): TokenDto {
        const tokenDto: TokenDto = JSON.parse(this.coockieService.get('access_token'));
        return tokenDto;
    }

    checkCredentials(): boolean {
        this.isLoggedIn = this.coockieService.check('access_token');
        return this.isLoggedIn;
    }

    closeSesion() {
        this.coockieService.delete('access_token');
        this.isLoggedIn = false;
        this.router.navigate(['/home']);
    }

}


