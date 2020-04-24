import { ReminderDto } from './reminder-dto';
import { TaskStatus } from './task-status';
import { Task } from './task';
import { dateTimeEquals } from '../service/task.service';
import { Reminder } from './reminder';


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
  reminders: ReminderDto[] = [];

  progress: number;
  isExpanded: boolean;
  statusPriority: number;

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
    this.mapReminderToReminderDto(task.reminders);

    this.setStatusPriority();
    this.progress = this.setProgress();
    this.isExpanded = false;
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

  setProgress(): number {
    var now = new Date();
    if (dateTimeEquals(this.startTime, this.endTime)) {
      if (now.getTime() < this.startTime.getTime()) {
        return 0;
      } else {
        return 100;
      }
    } else {
      if (this.startTime.getTime() > now.getTime()) {
        return 0;
      } else if (now.getTime() < this.endTime.getTime()) {
        var a = this.endTime.getTime() - this.startTime.getTime();
        var b = now.getTime() - this.startTime.getTime();
        return (b / a) * 100;
      } else if (this.endTime.getTime() < now.getTime()) {
        return 100;
      }
    }
  }

  setStatusPriority() {
    if (this.status === TaskStatus.STATUS_PENDING) {
      this.statusPriority = 0;
    } else if (this.status === TaskStatus.STATUS_PENDING_AUTOCOMPLETE) {
        this.statusPriority = 1;
      } else if (this.status === TaskStatus.STATUS_ACTIVE) {
          this.statusPriority = 2;
        } else if (this.status === TaskStatus.STATUS_ACTIVE_AUTOCOMPLETE) {
            this.statusPriority = 3;
          } else if (this.status === TaskStatus.STATUS_OVERDUE) {
              this.statusPriority = 4;
            } else if (this.status === TaskStatus.STATUS_COMPLETED) {
                this.statusPriority = 5;
              } else {
                this.statusPriority = 6;
              }
  }
}

