import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookiesDialogComponent } from '../fragments/cookies-dialog/cookies-dialog.component';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  openDialogCookies(): void {
    const dialogRef = this.dialog.open(CookiesDialogComponent, {});
  }
}
