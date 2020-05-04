import { Reminder } from './reminder';
import { TaskStatus } from './task-status';

export class Task {
    taskId: number;
    userId: number;
    title: string;
    notes: string;
    priority: number;
    startTime: string;
    endTime: string;
    completedTime: string;
    status: TaskStatus;
    progress: number;
    statusPriority: number;
    autocomplete: boolean;
    completed: boolean;
    reminders: Reminder[] = [];
}

