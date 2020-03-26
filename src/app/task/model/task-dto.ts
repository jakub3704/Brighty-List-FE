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

    constructor(taskId: number,
                userId: number,
                title: string,
                notes: string,
                priority: number,
                startTime: string,
                endTime: string,
                completedTime: string,
                status: TaskStatus,
                reminders: ReminderDto[]) {
        this.taskId = taskId,
        this.userId = userId,
        this.title = title,
        this.notes = notes,
        this.priority = priority,
        this.startTime = startTime,
        this.endTime = endTime,
        this.completedTime = completedTime,
        this.status = status;
        this.reminders = reminders;
    }

    public getTaskId() {
        return this.taskId;
    }

    public setTaskId(taskId: number) {
        this.taskId = taskId;
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getNotes() {
        return this.notes;
    }

    public setNotes(notes: string) {
        this.notes = notes;
    }

    public getPriority() {
        return this.priority;
    }

    public setPriority(priority: number) {
        this.priority = priority;
    }

    public getStartTime() {
        return this.startTime;
    }

    public setStartTime(startTime: string) {
        this.startTime = startTime;
    }

    public getCompletedTime() {
        return this.completedTime;
    }

    public setCompletedTime(completedTime: string) {
        this.completedTime = completedTime;
    }

    public getUserId() {
        return this.userId;
    }

    public setUserId(userId: number) {
        this.userId = userId;
    }

    public getEndTime() {
        return this.endTime;
    }

    public setEndTime(endTime: string) {
        this.endTime = endTime;
    }

    public getStatus() {
        return this.status;
    }

    public setStatus(status: TaskStatus) {
        this.status = status;
    }

    public getReminders() {
        return this.reminders;
    }

    public setReminders(reminders: ReminderDto[]) {
        this.reminders = reminders;
    }

}

