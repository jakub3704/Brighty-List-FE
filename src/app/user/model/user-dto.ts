import { UserRole } from './user-role';

export class UserDto {
    id: number;
    name: string;
    mail: string;
    password: string;
    role: UserRole;

    public getId() {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getMail() {
        return this.mail;
    }

    public setMail(mail: string) {
        this.mail = mail;
    }

    public getPassword() {
        return this.password;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getRole() {
        return this.role;
    }

    public setRole(role: UserRole) {
        this.role = role;
    }
}


