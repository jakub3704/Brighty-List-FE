import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskDto } from '../../model/task-dto';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyFormErrorStateMatcher } from 'src/app/config/my-form-error-state-matcher';
import { TaskStatus } from '../../model/task-status';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-dialog-new-task',
  templateUrl: './dialog-new-task.component.html',
  styleUrls: ['./dialog-new-task.component.scss'],
})
export class DialogNewTaskComponent implements OnInit {
  task: TaskDto = new TaskDto();
  now: Date;
  realNowHours: number;
  realNowMinutes: number;
  startDateTime: Date = new Date();
  startTime: string = '12:00';

  sameAsStart = true;
  endDateTime: Date;
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
    private taskService: TaskService) {
    dialogRef.disableClose = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitChange(): void {

    this.task.priority = parseInt(this.priority);
    this.task.startTime = this.startDateTime.toISOString();
    this.task.endTime = this.endDateTime.toISOString();
    this.setStatus(this.isAutocomplete);

    this.taskService.createTask(this.task).subscribe(data=>{data=this.task;});   ;
    this.dialogRef.close();
    window.location.reload();
  }

  onChangeStartTime(): void {
    var startTimeTmp: string[] = this.startTime.split(':');
    this.startDateTime.setHours(parseInt(startTimeTmp[0]));
    this.startDateTime.setMinutes(parseInt(startTimeTmp[1]));
    this.startDateTime.setMilliseconds(0);
    this.task.startTime = this.startDateTime.toISOString();

    this.ifSameAsStart();
  }

  onChangeEndTime(): void {
    var endTimeTmp: string[] = this.endTime.split(':');
    this.endDateTime.setHours(parseInt(endTimeTmp[0]));
    this.endDateTime.setMinutes(parseInt(endTimeTmp[1]));
    this.endDateTime.setMilliseconds(0);
    this.task.endTime = this.endDateTime.toISOString();

    this.ifSameAsStart();
  }

  ngOnInit(): void {
    this.now = new Date();
    this.realNowHours = this.now.getHours();
    this.realNowMinutes = this.now.getMinutes();
    this.now.setHours(this.now.getHours() + 4);
    this.now.setMinutes(0);
    this.now.setMilliseconds(0);
    this.startTime = this.now.getHours() + ':' + this.now.getMinutes();

    this.startDateTime.setHours(12);
    this.startDateTime.setMinutes(0);
    this.startDateTime.setMilliseconds(0);
    this.endDateTime = this.startDateTime;
    this.endTime = this.startTime;
  }

  //TODO move to BE
  setStatus(isAutocomplete: string) {
    if (isAutocomplete === 'true') {
      if (this.dateTimeEquals(this.now, this.startDateTime)) {
        this.task.status = TaskStatus.STATUS_ACTIVE_AUTOCOMPLETE
      }
      if (this.startDateTime > this.now){
        this.task.status = TaskStatus.STATUS_PENDING_AUTOCOMPLETE
      }
    }
    if (isAutocomplete === 'false') {
      if (this.dateTimeEquals(this.now, this.startDateTime)) {
        this.task.status = TaskStatus.STATUS_ACTIVE
      }
      if (this.startDateTime > this.now){
        this.task.status = TaskStatus.STATUS_PENDING
      }
    }
  }

  //TODO move to BE
  dateTimeEquals(a: Date, b: Date): boolean {
    if (a.getFullYear === b.getFullYear &&
      a.getMonth === b.getMonth &&
      a.getDay === b.getDay &&
      a.getHours === b.getHours &&
      a.getMinutes === b.getMinutes
    ) {
      return true;
    } else {
      return false;
    }
  }

  ifSameAsStart(): void {
    if (this.sameAsStart) {
      this.endDateTime = this.startDateTime;
      this.endTime = this.startTime;
    }
  }
}