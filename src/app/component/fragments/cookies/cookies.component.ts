import { Component, OnInit} from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {

  constructor(private cookieBarRef: MatSnackBarRef<CookiesComponent>,
    private coockieService: CookieService) {
    }

  ngOnInit(): void {
  }

  close(): void {
    var expires = new Date(new Date().getTime()+(30*60*1000));
    this.coockieService.set('cookie_set', 'true', expires);
    this.cookieBarRef.dismiss();
  }
}
