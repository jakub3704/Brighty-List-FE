import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskDto } from '../model/task-dto';
import { AuthenticationService } from '../../security/service/authentication.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  apiUrl = 'http://localhost:7070/';

  constructor(private httpClient: HttpClient,
    private authenticationService: AuthenticationService) { }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Bearer 96ca604a-2c8c-4932-bf6f-6c073cf23b29'
  });

  public getAllTasks(): Observable<TaskDto[]> {
    return this.httpClient.get<TaskDto[]>(this.apiUrl + 'tasks', { headers: this.httpHeaders });
  }

  public getTaskById(taskId: string) {
    return this.httpClient.get(this.apiUrl + 'tasks/' + taskId);
  }

  public createTask(task: TaskDto) {
    return this.httpClient.post(this.apiUrl + 'tasks/', task);
  }

  public updateTask(task: TaskDto) {
    return this.httpClient.put(this.apiUrl + 'tasks/' + task.getTaskId(), task);
  }

  public deleteTask(taskId: string) {
    return this.httpClient.delete(this.apiUrl + 'tasks/' + taskId);
  }
}


