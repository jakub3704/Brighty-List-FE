import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderDto } from '../../model/reminder-dto';
import { TaskDto } from '../../model/task-dto';
import { TaskStatus } from '../../model/task-status';
import { TaskService, dateTimeEquals, dateEquals } from '../../service/task.service';

@Component({
  selector: 'app-dialog-new-reminder',
  templateUrl: './dialog-new-reminder.component.html',
  styleUrls: ['./dialog-new-reminder.component.scss']
})
export class DialogNewReminderComponent implements OnInit {
  reminder: ReminderDto = new ReminderDto();

  reminderTypeSelection = 'NO_SELECTION';
  reapetTypeSelection = 'NEVER'

  selectedReapet: number = 2;
  reapet: number[] = [2, 3, 4, 5, 6, 7];
  timeBeforeValue: number = 15;
  timeBeforeArray: number[] = [];

  now: Date;
  myNow: Date;
  reminderDate: Date;
  reminderTime: string;
  minDate: Date;
  minTime: string = null;
  maxDate: Date;
  maxTime: string = null;
  errorSame = false;

  canBeforeStart: boolean;
  canBetween: boolean;

  dateStart = new Date(this.data.startTime);
  dateEnd = new Date(this.data.endTime);

  constructor(
    public dialogRef: MatDialogRef<DialogNewReminderComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: TaskDto) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.setInitialDateTimeNow();
    this.setDialogData();
    this.reminder.active = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.errorSame = false;
    this.setReminderDate();
    this.reminder.taskId = this.data.taskId
    if (!this.isSameReminders()) {
      this.taskService.createReminder(this.reminder).then(
        () => {
          this.dialogRef.close();
        });
    } else {
      this.errorSame = true;
    }
  }

  onDateChange() {
    if (dateEquals(this.reminderDate, this.minDate)) {
      this.minTime = this.timeToStringFromDate(this.minDate);
    } else {
      this.minTime = null;
    }
    if (dateEquals(this.reminderDate, this.maxDate)) {
      var tmpDate = new Date(this.maxDate.getTime() - (15 * 60 * 1000));
      this.maxTime = this.timeToStringFromDate(tmpDate);
    } else {
      this.maxTime = null;
    }
  }

  onTimeChange() {
    this.updateTimeOfDate(this.reminderTime, this.reminderDate);
  }

  private setInitialDateTimeNow() {
    this.now = new Date();
    this.now.setSeconds(0);
    this.now.setMilliseconds(0);
    this.myNow = this.setCustomMinutes(this.now);
  }

  private setCustomMinutes(dateTime: Date): Date {
    var date = new Date(dateTime);
    var compare = Math.round((date.getMinutes() / 30));
    if (compare === 0) {
      date.setHours(date.getHours() + 1);
      date.setMinutes(0);
    } else if (compare === 1) {
      date.setHours(date.getHours() + 1);
      date.setMinutes(30);
    } else if (compare === 2) {
      date.setHours(date.getHours() + 2);
      date.setMinutes(0);
    }
    return date;
  }

  private setDialogData() {
    this.setCanBeforeStart();
    this.setCanBeetween();

    if (this.canBeforeStart) {
      this.setTimeBeforeArray();
      this.reminderDateForBefore();
      this.reminderTypeSelection = 'BEFORE_START';
    } else if (this.canBetween) {
      this.reminderDateForBeetween()
      this.reminderTypeSelection = 'BETWEEN';
    } else {
      this.reminderTypeSelection = 'IMPOSIBLE';
    }
  }

  onReminderTypeSelectionChange(){
    if (this.reminderTypeSelection === 'BEFORE_START') {
      this.setTimeBeforeArray();
      this.reminderDateForBefore();
    } else if (this.reminderTypeSelection === 'BETWEEN') {
      this.reminderDateForBeetween()
    }
  }

  private setCanBeforeStart() {
    if ((this.data.startTime.getTime() - this.now.getTime()) > (20 * 60 * 1000)) {
      this.canBeforeStart = true;
    } else {
      this.canBeforeStart = false;
    }
  }

  private setCanBeetween() {
    if (dateTimeEquals(this.data.startTime, this.data.endTime)) {
      this.canBetween = false;
    } else if ((this.data.endTime.getTime() - this.data.startTime.getTime()) > (2 * 60 * 60 * 1000)) {
      if ((this.data.endTime.getTime() - this.now.getTime()) > (1 * 60 * 60 * 1000)) {
        this.canBetween = true;
      } else {
        this.canBetween = false;
      }
    }
  }

  private setTimeBeforeArray() {
    var minutesToStart = Math.floor((this.dateStart.getTime() - this.now.getTime()) / (1000 * 60));
    var maxIter: number;
    if (minutesToStart >= 20) {
      var interval = 15;
      maxIter = Math.floor(minutesToStart / interval);
      for (var i = 1; i <= 8 && i <= maxIter; i++) {
        this.timeBeforeArray.push(interval);
        interval += 15;
      }
      this.timeBeforeValue = 15;
    }
  }

  private reminderDateForBefore(){
    this.reminderDate = new Date(this.dateStart.getTime() - (this.timeBeforeValue * 60 * 1000));
  }

  private reminderDateForBeetween() {
    if ((this.data.startTime.getTime() - this.now.getTime()) > (20 * 60 * 1000)) {
      this.minDate = this.setCustomMinutes(this.data.startTime);
      this.minTime = this.timeToStringFromDate(this.minDate);
    } else {
      if (this.myNow.getTime() < this.data.startTime.getTime()) {
        this.minDate = new Date(this.setCustomMinutes(this.data.startTime));
      } else {
        this.minDate = new Date(this.myNow);
      }   
      this.minTime = this.timeToStringFromDate(this.minDate);
    }
    this.maxDate = new Date(this.data.endTime);
    this.maxTime = null;

    this.reminderDate = new Date(this.minDate);
    this.reminderTime = this.timeToStringFromDate(this.reminderDate);
  }

  private setReminderDate(): void {
    this.updateTimeOfDate(this.reminderTime, this.reminderDate);

    if (this.reminderTypeSelection === 'BEFORE_START') {
      this.reminder.cron = this.setCronForBeforeStart();
    } else if (this.reminderTypeSelection === 'BETWEEN') {
      this.reminder.cron = this.setCronBetween();
    }
  }

  private setCronForBeforeStart(): string {
    this.reminderDateForBefore();
    return '0' + ' ' + this.reminderDate.getMinutes()
      + ' ' + this.reminderDate.getHours()
      + ' ' + this.reminderDate.getDate()
      + ' ' + this.reminderDate.getMonth()
      + ' ' + '?';
  }

  private setCronBetween(): string {
    var minutes = this.reminderDate.getMinutes().toString();
    var hours = this.reminderDate.getHours().toString();
    var dayOfMonth = this.reminderDate.getDate().toString();
    var month = this.reminderDate.getMonth().toString();

    if (this.reapetTypeSelection === 'EVERY_DAY') {
      dayOfMonth = this.reminderDate.getDate().toString() + '/1';
      month = this.reminderDate.getMonth().toString() + '/1';
    }

    if (this.reapetTypeSelection === 'CUSTOM') {
      dayOfMonth = this.reminderDate.getDate().toString() + '/' + this.selectedReapet;
      month = this.reminderDate.getMonth().toString() + '/1';
    }

    if (this.reapetTypeSelection === 'NEVER') {
      dayOfMonth = this.reminderDate.getDate().toString();
      month = this.reminderDate.getMonth().toString();
    }

    return '0' + ' ' + minutes + ' ' + hours + ' ' + dayOfMonth + ' ' + month + ' ' + '?';
  }

  /** Simplified check for same reminders in task
   * 
   *  Attention!! do not include all possible scenarios, 
   *  some overlaping next execution times of reminders can occur
   *  More sofisticated check needed
   * 
   *  return true if there is possibility of same reminders
  */
  private isSameReminders(): boolean {
    for (var item of this.data.reminders) {
      var reminderCronSplit: string[] = this.reminder.cron.split(" ");
      var itemCronSplit: string[] = item.cron.split(" ");
      if (reminderCronSplit[1] === itemCronSplit[1] &&
        reminderCronSplit[2] === itemCronSplit[2]) {
        var reminderCronSplitDay: string[] = reminderCronSplit[3].split('/');
        var itemCronSplitDay: string[] = itemCronSplit[3].split('/');
        var reminderCronSplitMonth: string[] = reminderCronSplit[4].split('/');
        var itemCronSplitMonth: string[] = itemCronSplit[4].split('/');

        if (reminderCronSplitDay[0] === itemCronSplitDay[0]) {
          if (reminderCronSplitMonth[0] === itemCronSplitMonth[0]) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return false;
  }

  private timeToStringFromDate(date: Date): string {
    return date.getHours() + ':' + date.getMinutes();
  }

  private updateTimeOfDate(time: string, date: Date): void {
    var timeSplited: string[] = time.split(':');
    date.setHours(parseInt(timeSplited[0]));
    date.setMinutes(parseInt(timeSplited[1]));
    date.setMilliseconds(0);
  }
}