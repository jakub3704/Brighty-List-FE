import { ReminderDto } from './reminder-dto';
import { TaskStatus } from './task-status';

export class TaskDto {
    taskId: number;
    userId: number;
    title: string;
    notes: string;
    priority: number;
    startTime: string;
    endTime: string;
    completedTime: string;
    status: TaskStatus;
    reminders: ReminderDto[] = [];
}

