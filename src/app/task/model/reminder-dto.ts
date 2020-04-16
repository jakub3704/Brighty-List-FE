export class ReminderDto {
    reminderId: number;
    message: string;
    cron: string;
    nextExecutionTime: string;
    active: boolean;
}
