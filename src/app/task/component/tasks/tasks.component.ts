import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../service/task.service';
import { TaskDto } from '../../model/task-dto';
import { ReminderDto } from '../../model/reminder-dto';
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';
import { DialogNewReminderComponent } from '../dialog-new-reminder/dialog-new-reminder.component';
import { MatPaginator } from '@angular/material/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
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
    1: 'looks_one',
    2: 'looks_two',
    3: 'looks_3'
  };

  expandIcon = {
    false: 'chevron_right',
    true: 'expand_more',
  };
  tasks: TaskDto[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private taskService: TaskService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().then(data => {
      for (var item of data) {
        var taskDto = new TaskDto;
        taskDto.mapFromTask(item);
        this.tasks.push(taskDto);
      }
    });
  }

  openDialogNewTask(): void {
    const dialogRef = this.dialog.open(DialogNewTaskComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  openDialogUpdateTask(task: TaskDto): void {
    const dialogRef = this.dialog.open(DialogNewTaskComponent, {
      width: '800px',
      data: task
    });
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  openDialogAddReminder(task: TaskDto): void {
    const dialogRef = this.dialog.open(DialogNewReminderComponent, {
      width: '600px',
      data: task
    });
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  btnDeleteTask(task: TaskDto): void {
    this.taskService.deleteTask(task.taskId.toString()).subscribe();
  }

  btnDeleteReminder(reminder: ReminderDto): void {
    this.taskService.deleteReminder(reminder.reminderId.toString()).subscribe();
  }

  completeTask(task: TaskDto): void {
    this.taskService.completeTask(task.taskId.toString()).subscribe();;
  }

  sort(option: string) {
    switch (option) {
      case 'BY_PRIORITY':
        this.tasks = this.tasks.sort((a, b) => a.priority - b.priority);
        this.sortOption = 'BY_PRIORITY';
        this.sortIsReverse = false;
        break;
      case 'BY_START_DATE':
        this.tasks = this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        this.sortOption = 'BY_START_DATE';
        this.sortIsReverse = false;
        break;
      case 'BY_END_DATE':
        this.tasks = this.tasks.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
        this.sortOption = 'BY_END_DATE';
        break;
      case 'BY_TITLE':
        this.tasks = this.tasks.sort((a, b) => {
          if (a.title > b.title) { return 1; };
          if (a.title > b.title) { return -1; };
          return 0;
        });
        this.sortOption = 'BY_TITLE';
        this.sortIsReverse = false;
        break;
      case 'BY_STATUS':
        this.tasks = this.tasks.sort((a, b) => a.statusPriority - b.statusPriority);
        this.sortOption = 'BY_STATUS';
        this.sortIsReverse = false;
        break;
      case 'DEFAULT':
        this.tasks = this.tasks.sort((a, b) => a.taskId - b.taskId);
        this.sortOption = 'DEFAULT';
        this.sortIsReverse = false;
        break;
        window.scroll(0,0);
    }
  }

  sortReverse() {
    this.tasks = this.tasks.reverse();
    this.sortIsReverse = !this.sortIsReverse;
    window.scroll(0,0);
  }

  filterBtn(option: string) {
    this.filterOption = option;
    switch (option) {
      case 'DEFAULT':
        this.initialize();
        break;

      case 'BY_PRIORITY_HIGH':
        this.filter('priority', '1');
        break;

      case 'BY_PRIORITY_MEDIUM':
        this.filter('priority', '2');
        break;

      case 'BY_PRIORITY_LOW':
        this.filter('priority', '3');
        break;

      case 'STATUS_PENDING':
        this.filter('status', 'STATUS_PENDING');
        break;

      case 'STATUS_ACTIVE':
        this.filter('status', 'STATUS_ACTIVE');
        break;

      case 'STATUS_COMPLETED':
        this.filter('status', 'STATUS_COMPLETED');
        break;

      case 'STATUS_OVERDUE':
        this.filter('status', 'STATUS_OVERDUE');
        break;
    }
    window.scroll(0,0);
  }

  initialize() {
    this.tasks = [];
    this.taskService.getAllTasks().then(data => {
      for (var item of data) {
        var taskDto = new TaskDto;
        taskDto.mapFromTask(item);
        this.tasks.push(taskDto);
      }
    });
  }


  filter(column: string, input: string) {
    this.tasks = [];
    this.taskService.filter(column, input).then(data => {
      for (var item of data) {
        var taskDto = new TaskDto;
        taskDto.mapFromTask(item);
        this.tasks.push(taskDto);
      }
    });
  }

  search(searchInput: string) {
    this.tasks = [];
    this.taskService.searchAllTasks(searchInput).then(data => {
      for (var item of data) {
        var taskDto = new TaskDto;
        taskDto.mapFromTask(item);
        this.tasks.push(taskDto);
      }
    });
  }
}
