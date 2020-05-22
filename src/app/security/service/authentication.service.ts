import { Injectable, ɵbypassSanitizationTrustResourceUrl, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenDto } from './token-dto';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

const CLIENT_ID = 'brighty-client';
const CLIENT_SECRET = 'brighty-secret';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit {
    public isLoggedIn: boolean;
    public isInvalid = false;
    public isWrongData = false;
    token: TokenDto;

    constructor(private httpClient: HttpClient,
        private coockieService: CookieService,
        private router: Router) {
        this.isLoggedIn = this.checkCredentials();
    }
    ngOnInit(): void {
        if (this.checkCredentials()) {
            this.token = this.getTokenDto();
        }
        this.isWrongData = false;
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
            .toPromise().then(
                data => {
                    this.saveToken(data);
                    this.isLoggedIn = true;
                    this.isInvalid = false;
                    this.isWrongData = false;
                    this.router.navigate(['/tasks']);
                },
                error => {
                    this.isInvalid = true;
                    this.isWrongData = true;
                    console.error('retriveToken()');
                }
            );
    }

    async refreshToken() {
        console.log('refreshToken() - start | ' + new Date().toISOString());
        const token = this.getTokenDto();
        const httpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            });

        const oAuthBody = new HttpParams()
            .set('access_token', token.access_token)
            .append('refresh_token', token.refresh_token)
            .append('grant_type', 'refresh_token');

        console.log('refreshToken() - end | ' + new Date().toISOString());
        return await this.httpClient.post<TokenDto>(
            environment.backEndUrl + 'oauth/token',
            oAuthBody,
            { headers: httpHeaders })
            .toPromise()
    }

    saveToken(token: TokenDto) {
        this.token = token;
        var expire = new Date(new Date().getTime() + token.expires_in * 1000 * 10);
        this.coockieService.set('access_token', JSON.stringify(token), expire);
        console.log('AuthenticationService - saveToken() | ' + token.access_token + ' | ' + new Date().toISOString() + ' |');
    }

    updateToken(token: TokenDto) {
        this.token = token;
        var expire = new Date(new Date().getTime() + token.expires_in * 1000 * 10);
        this.coockieService.set('access_token', JSON.stringify(token), expire);
        console.log('AuthenticationService - updateToken() | ' + token.access_token + ' | ' + new Date().toISOString() + ' |');
    }

    getTokenDto(): TokenDto {
        var tokenDto = new TokenDto();
        tokenDto = JSON.parse(this.coockieService.get('access_token'));
        this.token = tokenDto;
        return tokenDto;
    }

    getAccesToken(): string {
        var tokenDto = new TokenDto();
        tokenDto = JSON.parse(this.coockieService.get('access_token'));
        return tokenDto.access_token;
    }

    checkCredentials(): boolean {
        if (this.coockieService.check('access_token')) {
            this.isLoggedIn = true;
        } else {
            this.token = null;
            this.isLoggedIn = false;
        }
        return this.isLoggedIn;
    }

    closeSesion() {
        this.coockieService.delete('access_token');
        this.isLoggedIn = false;
        this.router.navigate(['/home']);
    }

    addAuthHeaders(): HttpHeaders {
        if (this.token != null) {
            return new HttpHeaders(
                {
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: 'bearer ' + this.token.access_token
                });
        } else {
            return new HttpHeaders(
                {
                    'Content-Type': 'application/json;charset=UTF-8'
                });  
        }
    }

    addAuthHeadersText(): HttpHeaders {
        if (this.token != null) {
            return new HttpHeaders(
                {
                    'Content-Type': 'text/html;charset=UTF-8',
                    Authorization: 'bearer ' + this.token.access_token
                });
        } else {
            return new HttpHeaders(
                {
                    'Content-Type': 'text/html;charset=UTF-8'
                });  
        }
    }
    
}


