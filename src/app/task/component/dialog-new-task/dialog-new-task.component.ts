import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDto } from '../../model/task-dto';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { TaskStatus } from '../../model/task-status';
import { TaskService, dateTimeEquals } from '../../service/task.service';

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

  sameAsStart: boolean;
  endDateTime: Date = new Date();
  endTime: string;

  isAutocomplete = 'true';
  priority = '2';

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

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {
    this.prepareDataForSubmit();
    if (this.data === null) {
      this.taskService.createTask(this.task);
    } else {
      this.taskService.updateTask(this.task);
    }
    //this.dialogRef.close();
  }

  private prepareDataForSubmit() {
    this.task.priority = parseInt(this.priority);
    this.task.startTime = this.startDateTime;
    this.task.endTime = this.endDateTime;
    this.setStatus(this.isAutocomplete);
  }

  onChangeStartTime(): void {
    var startTimeTmp: string[] = this.startTime.split(':');
    this.startDateTime.setHours(parseInt(startTimeTmp[0]));
    this.startDateTime.setMinutes(parseInt(startTimeTmp[1]));
    this.startDateTime.setMilliseconds(0);
    this.task.startTime = this.startDateTime;

    this.ifSameAsStart();
  }

  onChangeEndTime(): void {
    var endTimeTmp: string[] = this.endTime.split(':');
    this.endDateTime.setHours(parseInt(endTimeTmp[0]));
    this.endDateTime.setMinutes(parseInt(endTimeTmp[1]));
    this.endDateTime.setMilliseconds(0);
    this.task.endTime = this.endDateTime;

    this.ifSameAsStart();
  }

  ngOnInit(): void {
    this.setInitialDateTimeNow();
    this.setBasicData();
  }

  private setInitialDateTimeNow() {
    this.now = new Date();
    this.now.setHours(this.now.getHours() + 4);
    this.now.setMinutes(0);
    this.now.setSeconds(0);
    this.now.setMilliseconds(0);
  }

  private setBasicData() {
    if (this.data != null) {
      this.task = this.data;
      this.startDateTime = new Date(this.task.startTime + 'Z');
      this.startTime = this.startDateTime.getHours() + ':' + this.startDateTime.getMinutes();

      this.endDateTime = new Date(this.task.endTime + 'Z');
      this.endTime = this.endDateTime.getHours() + ':' + this.endDateTime.getMinutes();

      this.sameAsStart = dateTimeEquals(this.startDateTime, this.endDateTime);
    } else {
      this.startDateTime = new Date(this.now);
      this.startTime = this.startDateTime.getHours() + ':' + this.startDateTime.getMinutes();

      this.endDateTime = new Date(this.now);
      this.endTime = this.endDateTime.getHours() + ':' + this.endDateTime.getMinutes();

      this.sameAsStart = true;
    }
  }

  setStatus(isAutocomplete: string) {
    if (isAutocomplete === 'true') {
      if (dateTimeEquals(this.now, this.startDateTime)) {
        this.task.status = TaskStatus.STATUS_ACTIVE_AUTOCOMPLETE
      }
      if (this.startDateTime > this.now) {
        this.task.status = TaskStatus.STATUS_PENDING_AUTOCOMPLETE
      }
    }
    if (isAutocomplete === 'false') {
      if (dateTimeEquals(this.now, this.startDateTime)) {
        this.task.status = TaskStatus.STATUS_ACTIVE
      }
      if (this.startDateTime > this.now) {
        this.task.status = TaskStatus.STATUS_PENDING
      }
    }
  }

  ifSameAsStart(): void {
    if (this.sameAsStart) {
      this.endDateTime.setDate(this.startDateTime.getDate());
      this.endTime = this.startTime;
    }
  } 
} 



