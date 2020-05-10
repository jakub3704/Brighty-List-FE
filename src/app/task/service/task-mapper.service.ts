import { Injectable } from '@angular/core';
import { dateTimeEquals } from 'src/app/utilities/my-date-util';
import { TaskDto } from '../model/task-dto';
import { Reminder } from '../model/reminder';
import { ReminderDto } from '../model/reminder-dto';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskMapperService {

  constructor() { }

  public mapTasksToTasksDto(tasksData: Task[]): TaskDto[] {
    var listTasksDto: TaskDto[] = [];
    for (var i = 0; i < tasksData.length; i++) {
      var taskDto = this.mapTaskToTaskDto(tasksData[i]);
      listTasksDto.push(taskDto);
    }
    return listTasksDto;
  }

  public mapTaskToTaskDto(task: Task): TaskDto {
    var taskDto = new TaskDto();
    taskDto.taskId = task.taskId;
    taskDto.userId = task.userId;
    taskDto.title = task.title;
    taskDto.notes = task.notes;
    taskDto.priority = task.priority;
    taskDto.startTime = new Date(task.startTime + 'Z');
    taskDto.endTime = new Date(task.endTime + 'Z');
    if (task.completedTime != null || task.completedTime != undefined) {
      taskDto.completedTime = new Date(task.completedTime + 'Z');
    };
    taskDto.status = task.status;
    taskDto.progress = task.progress;
    taskDto.statusPriority = task.statusPriority;
    taskDto.autocomplete = task.autocomplete;
    taskDto.completed = task.completed;
    taskDto.reminders = this.mapRemindersToRemindersDto(task.reminders);

    taskDto.isExpanded = false;
    taskDto.canAddReminder = this.canAddReminder(taskDto);
    return taskDto;
  }

  public mapTaskDtoToTask(taskDto: TaskDto): Task {
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
    task.reminders = this.mapRemindersDtoToReminders(taskDto.reminders);

    return task;
  }

  public mapReminderDtoToReminder(reminderDto: ReminderDto): Reminder {
    var reminder = new Reminder();
    reminder.taskId = reminderDto.taskId;
    reminder.reminderId = reminderDto.reminderId;
    reminder.message = reminderDto.message;
    reminder.cron = "";
    reminder.nextExecutionTime = reminderDto.nextExecutionTime.toISOString();;
    reminder.active = reminderDto.active;
    return reminder;
  }

  public mapRemindersDtoToReminders(remindersDto: ReminderDto[]): Reminder[] {
    var reminders: Reminder[] = [];
    if (remindersDto.length > 0) {
      for (var reminderDto of remindersDto) {
        var reminder = this.mapReminderDtoToReminder(reminderDto);
        reminders.push(reminder);
      };
    }
    return reminders;
  }

  public mapReminderToReminderDto(reminder: Reminder): ReminderDto {
    var reminderDto = new ReminderDto();
    reminderDto.taskId = reminder.taskId;
    reminderDto.reminderId = reminder.reminderId;
    reminderDto.message = reminder.message;
    reminderDto.cron = reminder.cron;
    if (reminder.nextExecutionTime != null || reminder.nextExecutionTime != undefined) {
      reminderDto.nextExecutionTime = new Date(reminder.nextExecutionTime + 'Z');
    };
    reminderDto.active = reminder.active;
    return reminderDto;
  }

  public mapRemindersToRemindersDto(reminders: Reminder[]): ReminderDto[] {
    var remindersDto: ReminderDto[] = [];
    if (reminders.length > 0) {
      for (var reminder of reminders) {
        var reminderDto = this.mapReminderToReminderDto(reminder);
        remindersDto.push(reminderDto);
      };
    }
    return remindersDto;
  }

  public canAddReminder(taskDto: TaskDto): boolean {
    var now = new Date();
    if (dateTimeEquals(taskDto.startTime, taskDto.endTime)) {
      if ((now.getTime() + (20 * 60 * 1000)) <= taskDto.startTime.getTime()) {
        return true;
      } else {
        return false;
      }
    }
    if ((now.getTime() + (20 * 60 * 1000)) <= taskDto.endTime.getTime()) {
      return true;
    } else {
      return false;
    }
  }
}
