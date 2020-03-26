export class ReminderDto {
    reminderId: number;
    message: string;
    cron: string;
    nextExecutionTime: string;
    active: boolean;

    constructor(nextExecutionTime: string,
                message: string) {
        this.nextExecutionTime = nextExecutionTime;
        this.message = message;
    }

    public getReminderId() {
        return this.reminderId;
    }

    public setReminderId(reminderId: number) {
        this.reminderId = reminderId;
    }

    public getMessage() {
        return this.message;
    }

    public setMessage(message: string) {
        this.message = message;
    }

    public getCron() {
        return this.cron;
    }

    public setCron(cron: string) {
        this.cron = cron;
    }

    public getNextExecutionTime() {
        return this.nextExecutionTime;
    }

    public setNextExecutionTime(nextExecutionTime: string) {
        this.nextExecutionTime = nextExecutionTime;
    }

    public isActive() {
        return this.active;
    }

    public setActive(active: boolean) {
        this.active = active;
    }
}
