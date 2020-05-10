import { ReminderDto } from './reminder-dto';
import { TaskStatus } from './task-status';
import { Task } from './task';
import { Reminder } from './reminder';
import { dateTimeEquals } from 'src/app/utilities/my-date-util';

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
}

