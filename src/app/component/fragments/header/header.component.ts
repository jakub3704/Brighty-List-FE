import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../security/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  selectedLang = 'en';

  constructor(
    public translate: TranslateService,
    public authenticationService: AuthenticationService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
  }

  logOut() {
    this.authenticationService.closeSesion();
  }
}
