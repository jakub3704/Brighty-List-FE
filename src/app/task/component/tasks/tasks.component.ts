import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../service/task.service';
import { TaskDto } from '../../model/task-dto';
import { TaskStatus } from '../../model/task-status';
import { ReminderDto } from '../../model/reminder-dto';
import { DialogUpdateTaskComponent } from '../dialog-update-task/dialog-update-task.component';
import { DialogUpdateReminderComponent } from '../dialog-update-reminder/dialog-update-reminder.component';
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  isRemindersVisible = false;
  reminderExpandIcon = "chevron_right";
  isFullView = true;

  prioritiesIcon = {
    1: 'looks_one',
    2: 'looks_two',
    3: 'looks_3'
  };

  tasks: TaskDto[] = [];

  constructor(private taskService: TaskService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(data => { this.tasks = data; });
  }
  openDialogNewTask(): void {
    const dialogRef = this.dialog.open(DialogNewTaskComponent, {
      width: '800px',
    });
  }
  openDialogUpdateTask(): void {
    const dialogRef = this.dialog.open(DialogUpdateTaskComponent, {
      width: '800px',
    });
  }

  openDialogAddReminder(): void {
    const dialogRef = this.dialog.open(DialogUpdateReminderComponent, {
      width: '600px',
    });
  }

  toggleReminderVisible() {
    if (this.isRemindersVisible === false) {
      this.isRemindersVisible = true;
      this.reminderExpandIcon = "expand_more";
    } else {
      this.isRemindersVisible = false;
      this.reminderExpandIcon = "chevron_right";
    }
  }
}
