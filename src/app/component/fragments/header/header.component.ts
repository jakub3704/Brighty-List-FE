import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../security/service/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  selectedLang = 'en';
  isLogged: boolean;

  constructor(
    public translate: TranslateService,
    private coockieService: CookieService,
    public authenticationService: AuthenticationService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');    
  }

  ngOnInit(): void {
    this.isLogged = this.authenticationService.checkCredentials();
    if (this.coockieService.check('lang_set')){
      this.selectedLang = this.coockieService.get('lang_set');
    } else {
      this.selectedLang = 'en'
    }
    this.translate.use(this.selectedLang);
  }

  switchLang(lang: string) {
    this.selectedLang = lang;
    var expires = new Date(new Date().getTime()+(12*60*60*1000));
    this.coockieService.set('lang_set', this.selectedLang, expires);
    this.translate.use(lang);
  }

  logOut() {
    this.authenticationService.closeSesion();  
  }
}
