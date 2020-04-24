import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskDto } from '../model/task-dto';
import { AuthenticationService } from '../../security/service/authentication.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReminderDto } from '../model/reminder-dto';
import { Task } from '../model/task';
import { Reminder } from '../model/reminder';

@Injectable({ providedIn: 'root' })
export class TaskService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient,
    private authenticationService: AuthenticationService) {
  }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
  });

  public async getAllTasks(): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks', { headers: this.httpHeaders }).toPromise();
  }

  public async searchAllTasks(searchInput: string): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/search=' + searchInput, { headers: this.httpHeaders }).toPromise();
  }

  public async filter(column: string, input: string): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/filter?column=' + column + '&input=' + input , { headers: this.httpHeaders }).toPromise();
  }

  public getTaskById(taskId: string) {
    return this.httpClient.get<Task>(this.backEndUrl + 'tasks/' + taskId, { headers: this.httpHeaders });
  }

  public async createTask(taskDto: TaskDto) {
    return await this.httpClient.post<Task>(this.backEndUrl + 'tasks', this.mapTaskDtoToTask(taskDto), { headers: this.httpHeaders }).toPromise();
  }

  public async updateTask(taskDto: TaskDto) {
    return await this.httpClient.put<Task>(this.backEndUrl + 'tasks/' + taskDto.taskId, this.mapTaskDtoToTask(taskDto), { headers: this.httpHeaders }).toPromise();
  }

  public completeTask(taskId: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return this.httpClient.get(this.backEndUrl + 'tasks/complete/' + taskId, { headers: httpHeaders });
  }

  public deleteTask(taskId: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return this.httpClient.delete(this.backEndUrl + 'tasks/' + taskId, { headers: httpHeaders });
  }

  public getReminderById(taskId: string, reminderId: string) {
    return this.httpClient.get<Reminder>(this.backEndUrl + 'tasks/' + taskId + '/reminders/' + reminderId, { headers: this.httpHeaders });
  }

  public async createReminder(reminderDto: ReminderDto) {
    return await this.httpClient.post<Reminder>(this.backEndUrl + 'reminders', this.mapReminderDtoToReminder(reminderDto), { headers: this.httpHeaders }).toPromise();
  }

  public deleteReminder(reminderId: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return this.httpClient.delete(this.backEndUrl + 'reminders/' + reminderId, { headers: httpHeaders });
  }

  private mapTaskDtoToTask(taskDto: TaskDto): Task {
    var task = new Task();
    task.taskId = taskDto.taskId;
    task.userId = taskDto.userId;
    task.title = taskDto.title;
    task.notes = taskDto.notes;
    task.priority = taskDto.priority;
    task.startTime = taskDto.startTime.toISOString();
    task.endTime = taskDto.endTime.toISOString();
    if (taskDto.completedTime != null || taskDto.completedTime != undefined) { 
    task.completedTime = taskDto.completedTime.toISOString();
    }
    task.status = taskDto.status;
    return task;
  }

  private mapReminderDtoToReminder(reminderDto: ReminderDto): Reminder {
    var reminder = new Reminder();
    reminder.taskId = reminderDto.taskId;
    reminder.reminderId = reminderDto.reminderId;
    reminder.message = reminderDto.message;
    reminder.cron = reminderDto.cron;
    reminder.nextExecutionTime = '';
    reminder.active = reminderDto.active;
    return reminder;
  }
}

export function dateTimeEquals(a: Date, b: Date): boolean {
  if (a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate() &&
    a.getHours() === b.getHours() &&
    a.getMinutes() === b.getMinutes()
  ) {
    return true;
  } else {
    return false;
  }
}
