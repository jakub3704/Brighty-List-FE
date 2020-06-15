import { ReminderDto } from './reminder-dto';
import { TaskStatus } from './task-status';

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

