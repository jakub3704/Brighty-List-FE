import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cookies-dialog',
  templateUrl: './cookies-dialog.component.html',
  styleUrls: ['./cookies-dialog.component.scss']
})
export class CookiesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CookiesDialogComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
