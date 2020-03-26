export class UserDto {
    private id: number;
    private name: string;
    private eMail: string;
    private password: string;
    private role: Role;

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
        return this.eMail;
    }

    public setMail(eMail: string) {
        this.eMail = eMail;
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

    public setRole(role: Role) {
        this.role = role;
    }
}


