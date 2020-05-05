import { Component, OnInit } from '@angular/core';
import { CookiesComponent } from './component/fragments/cookies/cookies.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "brighty-list-fe"

  constructor(private cookieBar: MatSnackBar,
    private coockieService: CookieService) {}

  ngOnInit(): void {
    if (!this.coockieService.check('cookie_set')){
      if('true' != this.coockieService.get('cookie_set')){
        this.openCookieBar();
      }
    } 
  }

  openCookieBar(): void {
    this.cookieBar.openFromComponent(CookiesComponent);
  }

}
