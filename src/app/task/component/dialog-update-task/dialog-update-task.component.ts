import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-task',
  templateUrl: './dialog-update-task.component.html',
  styleUrls: ['./dialog-update-task.component.scss']
})
export class DialogUpdateTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateTaskComponent>) {
    dialogRef.disableClose = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
      this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
