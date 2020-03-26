import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { TaskDto } from '../../model/task-dto';
import { TaskStatus } from '../../model/task-status';
import { ReminderDto } from '../../model/reminder-dto';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  prioritiesIcon = {
    1: 'looks_one',
    2: 'looks_two',
    3: 'looks_3'
  };
  tasks: TaskDto[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(data => { this.tasks = data; });
  }

}
