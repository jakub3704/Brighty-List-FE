import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TaskDto } from '../model/task-dto';
import { AuthenticationService } from '../../security/service/authentication.service';
import { environment } from '../../../environments/environment';
import { ReminderDto } from '../model/reminder-dto';
import { Task } from '../model/task';
import { Reminder } from '../model/reminder';
import { CustomErrorHandlerService } from 'src/app/error/custom-error-handler.service';
import { TaskMapperService } from './task-mapper.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  backEndUrl = environment.backEndUrl;

  constructor(private httpClient: HttpClient,
    private customErrorHandlerService: CustomErrorHandlerService,
    private authenticationService: AuthenticationService,
    private taskMapperService: TaskMapperService) {
  }

  public async getAllTasks() {
    var resultTasks: TaskDto[] = [];
    var isError = false;
    var myError: HttpErrorResponse;
    await this.getAllTasksToPromise().then(
      data => {
        resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
        console.log('TaskService - getAllTasks() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - getAllTasks() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.getAllTasksToPromise().then(
        data => {
          resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
          console.log('TaskService - getAllTasks() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - getAllTasks() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultTasks;
  }

  public async search(searchInput: string): Promise<TaskDto[]> {
    var resultTasks: TaskDto[] = [];
    var isError = false;
    var myError: HttpErrorResponse;
    await this.searchToPromise(searchInput).then(
      data => {
        resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
        console.log('TaskService - search() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - search() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.searchToPromise(searchInput).then(
        data => {
          resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
          console.log('TaskService - search() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - search() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultTasks;
  }

  public async filter(option: string): Promise<TaskDto[]> {
    var resultTasks: TaskDto[] = [];
    var isError = false;
    var myError: HttpErrorResponse;
    await this.filterToPromise(option).then(
      data => {
        resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
        console.log('TaskService - filter() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - filter() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.filterToPromise(option).then(
        data => {
          resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
          console.log('TaskService - filter() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - filter() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultTasks;
  }

  public async sort(option: String): Promise<TaskDto[]> {
    var resultTasks: TaskDto[] = [];
    var isError = false;
    var myError: HttpErrorResponse;
    await this.sortToPromise(option).then(
      data => {
        resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
        console.log('TaskService - sort() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - sort() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.sortToPromise(option).then(
        data => {
          resultTasks = this.taskMapperService.mapTasksToTasksDto(data);
          console.log('TaskService - sort() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - sort() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultTasks;
  }

  public async getTaskById(taskId: string): Promise<TaskDto> {
    var resultTask: TaskDto = null;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.getTaskByIdToPromise(taskId).then(
      data => {
        resultTask = this.taskMapperService.mapTaskToTaskDto(data);
        console.log('TaskService - getTaskById() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - getTaskById() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.getTaskByIdToPromise(taskId).then(
        data => {
          resultTask = this.taskMapperService.mapTaskToTaskDto(data);
          console.log('TaskService - getTaskById() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - getTaskById() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultTask;
  }

  public async createTask(taskDto: TaskDto): Promise<TaskDto> {
    var resultTask: TaskDto = null;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.createTaskToPromise(taskDto).then(
      data => {
        resultTask = this.taskMapperService.mapTaskToTaskDto(data);
        console.log('TaskService - createTask() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - createTask() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.createTaskToPromise(taskDto).then(
        data => {
          resultTask = this.taskMapperService.mapTaskToTaskDto(data);
          console.log('TaskService - createTask() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - createTask() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultTask;
  }

  public async updateTask(taskDto: TaskDto): Promise<TaskDto> {
    var resultTask: TaskDto = null;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.updateTaskToPromise(taskDto).then(
      data => {
        resultTask = this.taskMapperService.mapTaskToTaskDto(data);
        console.log('TaskService - updateTask() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - updateTask() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.updateTaskToPromise(taskDto).then(
        data => {
          resultTask = this.taskMapperService.mapTaskToTaskDto(data);
          console.log('TaskService - updateTask() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - updateTask() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultTask;
  }

  public async completeTask(taskId: string): Promise<any> {
    var isError = false;
    var myError: HttpErrorResponse;
    await this.completeTaskToPromise(taskId).then(
      data => {
        console.log('TaskService - completeTask() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - completeTask() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.completeTaskToPromise(taskId).then(
        data => {
          console.log('TaskService - completeTask() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - completeTask() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
  }

  public async deleteTask(taskId: string): Promise<any> {
    var isError = false;
    var myError: HttpErrorResponse;
    await this.deleteTaskToPromise(taskId).then(
      data => {
        console.log('TaskService - deleteTask() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - deleteTask() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.deleteTaskToPromise(taskId).then(
        data => {
          console.log('TaskService - deleteTask() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - deleteTask() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
  }

  public async getReminderById(taskId: string, reminderId: string): Promise<ReminderDto> {
    var resultReminder: ReminderDto = null;
    var isError = false;
    var myError: HttpErrorResponse;
    await this.getReminderByIdToPromise(taskId, reminderId).then(
      data => {
        resultReminder = this.taskMapperService.mapReminderToReminderDto(data);
        console.log('TaskService - getReminderById() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - getReminderById() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.getReminderByIdToPromise(taskId, reminderId).then(
        data => {
          resultReminder = this.taskMapperService.mapReminderToReminderDto(data);
          console.log('TaskService - getReminderById() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - getReminderById() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await resultReminder;
  }

  public async createReminder(reminderDto: ReminderDto, isReapet: boolean, ratio: number): Promise<string> {
    var result: string = 'basic';
    var isError = false;
    var myError: HttpErrorResponse;
    await this.createReminderToPromise(reminderDto, isReapet, ratio).then(
      data => {
        result = data.error;
        console.log('TaskService - createReminder() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - createReminder() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.createReminderToPromise(reminderDto, isReapet, ratio).then(
        data => {
          result = data.error;
          console.log('TaskService - createReminder() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - createReminder() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
    return await result;
  }

  public async deleteReminder(reminderId: string): Promise<any> {
    var isError = false;
    var myError: HttpErrorResponse;
    await this.deleteReminderToPromise(reminderId).then(
      data => {
        console.log('TaskService - deleteReminder() | OK | ' + new Date().toISOString() + ' |');
      },
      error => {
        isError = true;
        myError = error;
        console.error('TaskService - deleteReminder() | ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
      });
    if (isError && myError.status === 401) {
      await this.customErrorHandlerService.handle(myError);
      await this.deleteReminderToPromise(reminderId).then(
        data => {
          console.log('TaskService - deleteReminder() | RETRY OK | ' + new Date().toISOString() + ' |');
        },
        error => {
          console.error('TaskService - deleteReminder() | RETRY ERROR | ' + error.status + ' | ' + new Date().toISOString() + ' |');
        });
    }
  }

  private async getAllTasksToPromise(): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks', { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async searchToPromise(searchInput: string): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/search=' + searchInput, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async filterToPromise(option: string): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/filter?option=' + option, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async sortToPromise(option: String): Promise<Task[]> {
    return await this.httpClient.get<Task[]>(this.backEndUrl + 'tasks/sort?option=' + option, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async getTaskByIdToPromise(taskId: string): Promise<Task> {
    return await this.httpClient.get<Task>(this.backEndUrl + 'tasks/' + taskId, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async createTaskToPromise(taskDto: TaskDto): Promise<Task> {
    return await this.httpClient.post<Task>(this.backEndUrl + 'tasks', this.taskMapperService.mapTaskDtoToTask(taskDto), { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async updateTaskToPromise(taskDto: TaskDto): Promise<Task> {
    return await this.httpClient.put<Task>(this.backEndUrl + 'tasks/' + taskDto.taskId, this.taskMapperService.mapTaskDtoToTask(taskDto), { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async completeTaskToPromise(taskId: string): Promise<any> {
    return await this.httpClient.get(this.backEndUrl + 'tasks/complete/' + taskId, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async deleteTaskToPromise(taskId: string): Promise<any> {
    return await this.httpClient.delete(this.backEndUrl + 'tasks/' + taskId, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async getReminderByIdToPromise(taskId: string, reminderId: string): Promise<Reminder> {
    return await this.httpClient.get<Reminder>(this.backEndUrl + 'tasks/' + taskId + '/reminders/' + reminderId, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async createReminderToPromise(reminderDto: ReminderDto, isReapet: boolean, ratio: number): Promise<any> {
    return await this.httpClient.post<any>(this.backEndUrl + 'tasks/reminders?isReapet=' + isReapet + '&ratio=' + ratio, this.taskMapperService.mapReminderDtoToReminder(reminderDto), { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }

  public async deleteReminderToPromise(reminderId: string): Promise<any> {
    return await this.httpClient.delete(this.backEndUrl + 'tasks/reminders/' + reminderId, { headers: this.authenticationService.addAuthHeaders() }).toPromise();
  }
}