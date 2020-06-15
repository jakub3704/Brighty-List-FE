import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../service/task.service';
import { TaskDto } from '../../model/task-dto';
import { ReminderDto } from '../../model/reminder-dto';
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';
import { DialogNewReminderComponent } from '../dialog-new-reminder/dialog-new-reminder.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: TaskDto[] = [];

  isFullView = true;
  sortOption = 'DEFAULT';
  sortIsReverse = false;
  filterOption = 'DEFAULT';
  searchInput = '';

  sortIcon = {
    true: 'expand_less',
    false: 'expand_more'
  };

  prioritiesIcon = {
    1: 'assets/images/p_high.png',
    2: 'assets/images/p_medium.png',
    3: 'assets/images/p_low.png'
  };

  expandIcon = {
    false: 'chevron_right',
    true: 'expand_more',
  };

  constructor(private taskService: TaskService,
    public dialog: MatDialog, 
    public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.refresh();
    window.scroll(0, 0);
  }

  toggleView(): void{
    this.isFullView = !this.isFullView;
  }
  
  openDialogNewTask(): void {
    const dialogRef = this.dialog.open(DialogNewTaskComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  openDialogUpdateTask(task: TaskDto): void {
    const dialogRef = this.dialog.open(DialogNewTaskComponent, {
      width: '800px',
      data: task
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.refresh();
      });
  }

  openDialogAddReminder(task: TaskDto): void {
    const dialogRef = this.dialog.open(DialogNewReminderComponent, {
      width: '600px',
      data: task
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.refresh();
      });
  }

  btnDeleteTask(task: TaskDto): void {
    this.taskService.deleteTask(task.taskId.toString()).then(() => { this.refresh(); });
  }

  btnDeleteReminder(reminder: ReminderDto): void {
    this.taskService.deleteReminder(reminder.reminderId.toString()).then(() => { this.refresh(); });
  }

  completeTask(task: TaskDto): void {
    this.taskService.completeTask(task.taskId.toString()).then(() => { this.refresh(); });
  }

  async refresh() {
    await this.taskService.getAllTasks().then(
      data => {
      this.tasks = data;
    });  
  }

  sort(option: string) {
    this.sortOption = option;
    this.sortIsReverse = false;
    if (this.filterOption != 'DEFAULT') {
      switch (option) {
        case 'BY_PRIORITY':
          this.tasks = this.tasks.sort((a, b) => a.priority - b.priority);
          break;
        case 'BY_START_DATE':
          this.tasks = this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
          break;
        case 'BY_END_DATE':
          this.tasks = this.tasks.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
          break;
        case 'BY_TITLE':
          this.tasks = this.tasks.sort((a, b) => {
            if (a.title > b.title) { return 1; };
            if (a.title > b.title) { return -1; };
            return 0;
          });
          break;
        case 'BY_STATUS':
          this.tasks = this.tasks.sort((a, b) => a.statusPriority - b.statusPriority);
          break;
        case 'DEFAULT':
          this.tasks = this.tasks.sort((a, b) => a.taskId - b.taskId);
          break;
      }
    } else {
      this.tasks = [];
      this.taskService.sort(option).then(data => {this.tasks = data;});  
    }
    window.scroll(0, 0);
  }

  filter(option: string) {
    this.filterOption = option;
    this.sortOption = 'DEFAULT';
    this.sortIsReverse = false;
    this.tasks = [];
    this.taskService.filter(option).then(
      data => {
      this.tasks = data;
    });  
  }

  search(searchInput: string) {
    this.filterOption = 'DEFAULT';
    this.sortOption = 'DEFAULT';
    this.sortIsReverse = false;
    this.tasks = [];
    this.taskService.search(searchInput).then(
      data => {
      this.tasks = data;
    });  
  }

  sortReverse() {
    this.tasks = this.tasks.reverse();
    this.sortIsReverse = !this.sortIsReverse;
    window.scroll(0, 0);
  }
}

