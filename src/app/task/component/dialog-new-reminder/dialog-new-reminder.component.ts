import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderDto } from '../../model/reminder-dto';
import { TaskDto } from '../../model/task-dto';
import { TaskStatus } from '../../model/task-status';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-dialog-new-reminder',
  templateUrl: './dialog-new-reminder.component.html',
  styleUrls: ['./dialog-new-reminder.component.scss']
})
export class DialogNewReminderComponent implements OnInit {
  reminderTypeSelection = 'NO_SELECTION';
  betweenTypeSelection = 'BY_DATE';
  reapetTypeSelection = 'NEVER'

  selectedDay: string = 'Monday';
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedReapet: number;
  reapet: number[] = [1, 2, 3, 4, 5, 6, 7];
  timeBeforeValue: number;;
  timeBeforeArray: number[] = [];

  reminderByDate: Date;
  reminderTime: string;

  reminder: ReminderDto = new ReminderDto();
  now: Date;
  dateStart = new Date(this.data.startTime);
  dateEnd = new Date(this.data.endTime);

  constructor(
    public dialogRef: MatDialogRef<DialogNewReminderComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: TaskDto) {
    dialogRef.disableClose = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.setReminderDate();
    this.reminder.taskId = this.data.taskId
    this.taskService.createReminder(this.reminder);
    //this.dialogRef.close();
  }

  ngOnInit(): void {
    this.now = new Date();
    this.now.setSeconds(0);
    this.now.setMilliseconds(0);

    this.reminderByDate = new Date(this.dateEnd.getTime() - (15 * 60 * 1000));
    this.reminderTime = this.reminderByDate.getHours() + ':' + this.reminderByDate.getMinutes();
    this.setReminderType();

    this.reminder.message="";
    this.reminder.active=true;
  }

  private setReminderType() {
    var minutesToStart = (this.dateStart.getTime() - this.now.getTime()) / (1000 * 60);
    var interval = 15;
    var maxIter: number;
    if (minutesToStart > 0) {
      maxIter = ((minutesToStart - (minutesToStart / interval)) / interval) - 1;
    } else {
      maxIter = 0;
    }


    if (((this.dateStart.getTime() - this.now.getTime()) < 0) && ((this.dateEnd.getTime() - this.now.getTime()) > 0)) {
      this.reminderTypeSelection = 'BETWEEN';
    } else if (maxIter < 1) {
      this.reminderTypeSelection = 'NO_SELECTION';
    } else if ((this.dateStart.getTime() - this.now.getTime()) > 0) {
      this.timeBeforeValue = 15;
      this.reminderTypeSelection = 'BEFORE_START';
      for (var i = 1; i <= 8 && i <= maxIter; i++) {
        this.timeBeforeArray.push(interval);
        interval += 15;
      }
    }
  }

  private setReminderDate(): void {
    var timeTmp: string[] = this.reminderTime.split(':');
    this.reminderByDate.setHours(parseInt(timeTmp[0]));
    this.reminderByDate.setMinutes(parseInt(timeTmp[1]));

    if (this.reminderTypeSelection === 'BEFORE_START') {
      var nextExecutionTime = new Date(this.dateStart.getTime() - (this.timeBeforeValue * 60 * 1000));
      this.reminder.cron = '0'
        + ' ' + nextExecutionTime.getMinutes()
        + ' ' + nextExecutionTime.getHours()
        + ' ' + nextExecutionTime.getDate()
        + ' ' + nextExecutionTime.getMonth()
        + ' ' + '?';
    } else if (this.reminderTypeSelection === 'BETWEEN') {
      var minutes = this.reminderByDate.getMinutes().toString();
      var hours = this.reminderByDate.getHours().toString();
      var dayOfMonth: string;
      var month: string;
      var dayOfWeek: string;

      if (this.betweenTypeSelection === 'BY_DATE') {
        dayOfMonth = this.reminderByDate.getDate().toString();
        month = this.reminderByDate.getMonth().toString();
        dayOfWeek = '?';

        if (this.reapetTypeSelection === 'EVERY_DAY') {
          dayOfMonth = this.reminderByDate.getDate().toString() + '/1';
          month = this.reminderByDate.getMonth().toString() + '/1';
        }

        if (this.reapetTypeSelection === 'CUSTOM') {
          dayOfMonth = this.reminderByDate.getDate().toString() + '/' + this.selectedReapet;
          month = this.reminderByDate.getMonth().toString() + '/1';
        }

        if (this.reapetTypeSelection === 'NEVER') {
          dayOfMonth = this.reminderByDate.getDate().toString();
          month = this.reminderByDate.getMonth().toString();
        }
      } else {
        dayOfMonth = '?';
        month = '*'
        switch (this.selectedDay) {
          case 'Monday':
            dayOfWeek = 'MON';
            break;
          case 'Tuesday':
            dayOfWeek = 'TUE';
            break;
          case 'Wednesday':
            dayOfWeek = 'WED';
            break;
          case 'Thursday':
            dayOfWeek = 'THU';
            break;
          case 'Friday':
            dayOfWeek = 'FRI';
            break;
          case 'Saturday':
            dayOfWeek = 'SAT';
            break;
          case 'Sunday':
            dayOfWeek = 'SUN';
            break;
          default:
            dayOfWeek = '*';
        }
      }
      this.reminder.cron = '0' + ' ' + minutes + ' ' + hours + ' ' + dayOfMonth + ' ' + month + ' ' + dayOfWeek;
    }
  }
}