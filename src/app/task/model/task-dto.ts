import { ReminderDto } from './reminder-dto';
import { TaskStatus } from './task-status';
import { Task } from './task';
import { Reminder } from './reminder';
import { dateTimeEquals } from '../service/task.service';

export class TaskDto {
  taskId: number;
  userId: number;
  title: string;
  notes: string;
  priority: number;
  startTime: Date;
  endTime: Date;
  completedTime: Date;
  status: TaskStatus;
  progress: number;
  statusPriority: number;
  autocomplete: boolean;
  completed: boolean;
  reminders: ReminderDto[] = [];

  isExpanded: boolean;
  canAddReminder: boolean;

  mapFromTask(task: Task) {
    this.taskId = task.taskId;
    this.userId = task.userId;
    this.title = task.title;
    this.notes = task.notes;
    this.priority = task.priority;
    this.startTime = new Date(task.startTime + 'Z');
    this.endTime = new Date(task.endTime + 'Z');
    if (task.completedTime != null || task.completedTime != undefined) {
      this.completedTime = new Date(task.completedTime + 'Z');
    };
    this.status = task.status;
    this.progress = task.progress;
    this.statusPriority = task.statusPriority;
    this.autocomplete = task.autocomplete;
    this.completed = task.completed;
    this.mapReminderToReminderDto(task.reminders);

    this.isExpanded = false;
    this.setCanAddReminder();
  }

  mapReminderToReminderDto(reminders: Reminder[]) {
    if (reminders.length > 0) {
      for (var reminder of reminders) {
        var reminderDto = new ReminderDto();
        reminderDto.taskId = reminder.taskId;
        reminderDto.reminderId = reminder.reminderId;
        reminderDto.message = reminder.message;
        reminderDto.cron = reminder.cron;
        if (reminder.nextExecutionTime != null || reminder.nextExecutionTime != undefined) {
          reminderDto.nextExecutionTime = new Date(reminder.nextExecutionTime + 'Z');
        };
        reminderDto.active = reminder.active;

        this.reminders.push(reminderDto);
      };
    }
  }

  setCanAddReminder() {
    var now = new Date();

    if (dateTimeEquals(this.startTime, this.endTime)) {
      if ((now.getTime() + (20 * 60 * 1000)) <= this.startTime.getTime()) {
        this.canAddReminder = true;
      } else {
        this.canAddReminder = false;
      }
    }

    if ((now.getTime() + (20 * 60 * 1000)) <= this.endTime.getTime()) {
      this.canAddReminder = true;
    } else {
      this.canAddReminder = false;
    }

  }
}

