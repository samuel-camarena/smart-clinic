export class LoginDTO {
    constructor(identifier, password, role) {
        this.identifier = identifier;
        this.password = password;
        this.role = role;
    }
}