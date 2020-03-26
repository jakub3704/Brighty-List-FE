import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../security/service/authentication.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  apiUrl = 'http://localhost:7070/';
  msg: Message;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }


  getMessage() {
    const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + this.authenticationService.checkCredentials()
        });
    return this.httpClient.get<Message>(this.apiUrl + 'index', { headers: httpHeaders })
    .subscribe(data => this.msg = data);
  }
}

class Message {
  msg: string;
}
