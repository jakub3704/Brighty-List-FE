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

  public async search(searchInput: string): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/search=' + searchInput, { headers: this.httpHeaders }).toPromise();
  }

  public async filter(option: string): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/filter?option=' + option, { headers: this.httpHeaders }).toPromise();
  }

  public async sort(option: String): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/sort?option=' + option, { headers: this.httpHeaders }).toPromise();
  }

  public async getTaskById(taskId: string) {
    return await this.httpClient.get<Task>(this.backEndUrl + 'tasks/' + taskId, { headers: this.httpHeaders }).toPromise();
  }

  public async createTask(taskDto: TaskDto) {
    return await this.httpClient.post<Task>(this.backEndUrl + 'tasks', this.mapTaskDtoToTask(taskDto), { headers: this.httpHeaders }).toPromise();
  }

  public async updateTask(taskDto: TaskDto) {
    return await this.httpClient.put<Task>(this.backEndUrl + 'tasks/' + taskDto.taskId, this.mapTaskDtoToTask(taskDto), { headers: this.httpHeaders }).toPromise();
  }

  public async completeTask(taskId: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.get(this.backEndUrl + 'tasks/complete/' + taskId, { headers: httpHeaders }).toPromise();
  }

  public async deleteTask(taskId: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.delete(this.backEndUrl + 'tasks/' + taskId, { headers: httpHeaders }).toPromise();
  }

  public async getReminderById(taskId: string, reminderId: string) {
    return await this.httpClient.get<Reminder>(this.backEndUrl + 'tasks/' + taskId + '/reminders/' + reminderId, { headers: this.httpHeaders }).toPromise();
  }

  public async createReminder(reminderDto: ReminderDto) {
    return await this.httpClient.post<Reminder>(this.backEndUrl + 'reminders', this.mapReminderDtoToReminder(reminderDto), { headers: this.httpHeaders }).toPromise();
  }

  public async deleteReminder(reminderId: string) {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.authenticationService.getToken().access_token
    });
    return await this.httpClient.delete(this.backEndUrl + 'reminders/' + reminderId, { headers: httpHeaders }).toPromise();
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
    task.progress = taskDto.progress;
    task.statusPriority = taskDto.statusPriority;
    task.autocomplete = taskDto.autocomplete;
    task.completed = taskDto.completed;

    if (taskDto.reminders.length > 0) {
      for (var reminderDto of taskDto.reminders) {
        var reminder: Reminder = this.mapReminderDtoToReminder(reminderDto);
        task.reminders.push(reminder);
      }
    }

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

export function dateEquals(a: Date, b: Date): boolean {
  if (a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()) {
    return true;
  } else {
    return false;
  }
}