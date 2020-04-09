import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskDto } from '../model/task-dto';
import { AuthenticationService } from '../../security/service/authentication.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  public getAllTasks(): Observable<TaskDto[]> {
    return this.httpClient.get<TaskDto[]>(this.backEndUrl + 'tasks', { headers: this.httpHeaders });
  }

  public getTaskById(taskId: string) {
    return this.httpClient.get(this.backEndUrl + 'tasks/' + taskId, { headers: this.httpHeaders });
  }

  public createTask(task: TaskDto) {
    return this.httpClient.post(this.backEndUrl + 'tasks/', task, { headers: this.httpHeaders });
  }

  public updateTask(task: TaskDto) {
    return this.httpClient.put(this.backEndUrl + 'tasks/' + task.getTaskId(), task, { headers: this.httpHeaders });
  }

  public deleteTask(taskId: string) {
    return this.httpClient.delete(this.backEndUrl + 'tasks/' + taskId, { headers: this.httpHeaders });
  }
}


