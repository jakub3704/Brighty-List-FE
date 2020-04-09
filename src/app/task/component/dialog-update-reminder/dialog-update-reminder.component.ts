import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-reminder',
  templateUrl: './dialog-update-reminder.component.html',
  styleUrls: ['./dialog-update-reminder.component.scss']
})
export class DialogUpdateReminderComponent implements OnInit {
  reminderTypeSelection = 'NO_SELECTION';
  betweenTypeSelection = 'BY_DATE';
  reapetTypeSelection = 'NEVER'

  selectedDay: string;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedReapet: number;
  reapet: number[] = [1, 2, 3, 4, 5, 6, 7];


  constructor(
    public dialogRef: MatDialogRef<DialogUpdateReminderComponent>) {
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
