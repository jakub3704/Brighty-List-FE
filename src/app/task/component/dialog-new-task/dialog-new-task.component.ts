import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDto } from '../../model/task-dto';
import { FormControl, Validators} from '@angular/forms';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { TaskService, dateTimeEquals, dateEquals } from '../../service/task.service';

@Component({
  selector: 'app-dialog-new-task',
  templateUrl: './dialog-new-task.component.html',
  styleUrls: ['./dialog-new-task.component.scss'],
})
export class DialogNewTaskComponent implements OnInit {
  task: TaskDto = new TaskDto();
  now: Date;
  startDateTime: Date = new Date();
  startTime: string;

  sameAsStart: boolean = true;
  endDateTime: Date = new Date();
  endTime: string;
  endTimeMin: string =  null;
  startTimeMin: string;

  isAutocomplete: string = 'true';
  priority: string = '2';

  titleControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  public matcher = new MyFormErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DialogNewTaskComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: TaskDto) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.setInitialDateTimeNow();
    this.setBasicData();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.prepareDataForSubmit();
    if (this.data === null) {
      this.taskService.createTask(this.task).then(
        () => {
          this.dialogRef.close();
        });;
    } else {
      this.taskService.updateTask(this.task).then(
        () => {
          this.dialogRef.close();
        });;
    }
  }

  private prepareDataForSubmit() {
    this.task.priority = parseInt(this.priority);
    this.task.startTime = this.startDateTime;
    this.task.endTime = this.endDateTime;

    if (this.isAutocomplete === 'true') {
      this.task.autocomplete = true;
    } else {
      this.task.autocomplete = false;
    }
    this.task.completed = false;
  }

  onChangeStartDate(): void {
    this.ifSameAsStart();
    this.setStartTimeMin();
    this.setEndTimeMin();
  }

  onChangeEndDate(): void {
    this.ifSameAsStart();
    this.setStartTimeMin();
    this.setEndTimeMin();
  }

  onChangeStartTime(): void {
    this.updateTimeOfDate(this.startTime, this.startDateTime)
    this.task.startTime = this.startDateTime;

    this.ifSameAsStart();
    this.setStartTimeMin();
    this.setEndTimeMin();
  }

  onChangeEndTime(): void {
    this.updateTimeOfDate(this.endTime, this.endDateTime)
    this.task.endTime = this.endDateTime;

    this.ifSameAsStart();
    this.setStartTimeMin();
    this.setEndTimeMin();
  }
  
  ifSameAsStart(): void {
    if (this.sameAsStart) {
      this.endDateTime = new Date(this.startDateTime);
      this.endTime = this.startTime;
    }
  }

  private setInitialDateTimeNow() {
    this.now = new Date();
    var compare = Math.round((this.now.getMinutes() / 30));
    if (compare === 0) {
      this.now.setHours(this.now.getHours() + 1);
      this.now.setMinutes(0);
    } else if (compare === 1) {
      this.now.setHours(this.now.getHours() + 1);
      this.now.setMinutes(30);
    }  else if (compare === 2) {
      this.now.setHours(this.now.getHours() + 2);
      this.now.setMinutes(0);
    } 
    this.now.setSeconds(0);
    this.now.setMilliseconds(0);
  }

  private setBasicData() {
    if (this.data != null) {
      this.task = this.data;
      this.startDateTime = new Date(this.task.startTime);
      this.startTime = this.timeToStringFromDate(this.startDateTime);

      this.endDateTime = new Date(this.task.endTime);
      this.endTime = this.timeToStringFromDate(this.endDateTime);

      this.sameAsStart = dateTimeEquals(this.startDateTime, this.endDateTime);

      this.setEndTimeMin();
      this.updateIsAutocomplete(this.task.autocomplete);
    } else {
      this.startDateTime = new Date(this.now);
      this.startTime = this.timeToStringFromDate(this.startDateTime);

      this.endDateTime = new Date(this.now);
      this.endTime = this.timeToStringFromDate(this.endDateTime);

      this.sameAsStart = true;
      this.endTimeMin = this.startTime
    }
    this.setStartTimeMin();
  }

  private setEndTimeMin(): void {
    if (dateEquals(this.startDateTime, this.endDateTime)) {
      this.endTimeMin = this.startTime
    } else {
      this.endTimeMin =  null;
    }
  }

  private setStartTimeMin(): void {
    if (dateEquals(this.startDateTime, this.now)) {
      if (this.data != null) {
        var tmp = new Date();
        this.startTimeMin = (tmp.getHours() + 1) + ':' + tmp.getMinutes();
      } else {
        this.startTimeMin = this.timeToStringFromDate(this.now);
      }
    } else if (this.startDateTime.getTime() < this.now.getTime()) {
      var tmp = new Date();
      this.startTimeMin = (tmp.getHours() + 1) + ':' + tmp.getMinutes();
    } else {
      this.startTimeMin =  null;
    }
  }

  private updateIsAutocomplete(autocomplete: boolean) {
    if (autocomplete) {
      this.isAutocomplete = 'true';
    } else {
      this.isAutocomplete = 'false';
    }
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



