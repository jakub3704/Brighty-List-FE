export class Reminder {
    taskId: number;
    reminderId: number;
    message: string;
    cron: string;
    nextExecutionTime: string;
    active: boolean;
}
