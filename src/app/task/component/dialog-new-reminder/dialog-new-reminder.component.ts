import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderDto } from '../../model/reminder-dto';
import { TaskDto } from '../../model/task-dto';
import { TaskService } from '../../service/task.service';
import { dateEquals, dateTimeEquals } from 'src/app/utilities/my-date-util';

@Component({
  selector: 'app-dialog-new-reminder',
  templateUrl: './dialog-new-reminder.component.html',
  styleUrls: ['./dialog-new-reminder.component.scss']
})
export class DialogNewReminderComponent implements OnInit {
  reminder: ReminderDto = new ReminderDto();
  isReapet: boolean = false;
  ratio: number = 0;

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
  minTime: string;
  maxDate: Date;
  maxTime: string;

  response = '';

  canBeforeStart: boolean;
  canBetween: boolean;

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

  async submitChange() {
    this.response = '';
    this.setReminderDate();
    this.reminder.taskId = this.data.taskId
    await this.taskService.createReminder(this.reminder, this.isReapet, this.ratio).then(data => this.response = data);
    if (this.response==="none"){
      this.dialogRef.close();
    }
  }

  onDateChange() {
    if (dateEquals(this.reminderDate, this.minDate)) {
      this.minTime = this.timeToStringFromDate(this.minDate);
      this.reminderTime = this.minTime;
      this.updateTimeOfDate(this.reminderTime, this.reminderDate);
    } else {
      this.minTime = null;
      this.updateTimeOfDate(this.reminderTime, this.reminderDate);
    }
    if (dateEquals(this.reminderDate, this.maxDate)) {
      var tmpDate = new Date(this.maxDate.getTime() - (15 * 60 * 1000));
      this.maxTime = this.timeToStringFromDate(tmpDate);
      this.reminderTime = this.maxTime;
      this.updateTimeOfDate(this.reminderTime, this.reminderDate);
    } else {
      this.maxTime = null;
      this.updateTimeOfDate(this.reminderTime, this.reminderDate);
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

  onReminderTypeSelectionChange() {
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
    var minutesToStart = Math.floor((this.data.startTime.getTime() - this.now.getTime()) / (1000 * 60));
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

  private reminderDateForBefore() {
    this.reminderDate = new Date(this.data.startTime.getTime() - (this.timeBeforeValue * 60 * 1000));
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
    if (this.reminderTypeSelection === 'BEFORE_START') {
      this.reminderDateForBefore();
      this.isReapet = false;
      this.ratio = 0;
    } else if (this.reminderTypeSelection === 'BETWEEN') {
      this.updateTimeOfDate(this.reminderTime, this.reminderDate);

      if (this.reapetTypeSelection === 'EVERY_DAY') {
        this.isReapet = true;
        this.ratio = 1;
      } 
      if (this.reapetTypeSelection === 'CUSTOM') {
        this.isReapet = true;
        this.ratio = this.selectedReapet;
      }
      if (this.reapetTypeSelection === 'NEVER') {
        this.isReapet = false;
        this.ratio = 0;
      }
    }
    this.reminder.nextExecutionTime = this.reminderDate;
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