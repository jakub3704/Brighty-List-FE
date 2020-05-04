export class ReminderDto {
    taskId: number;
    reminderId: number;
    message: string;
    cron: string;
    nextExecutionTime: Date;
    active: boolean; 
}
