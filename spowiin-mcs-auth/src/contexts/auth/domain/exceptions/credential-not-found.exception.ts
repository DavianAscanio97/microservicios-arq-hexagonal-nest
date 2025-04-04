import { NotFoundException } from "@nestjs/common";

export class CredentialNotFoundException extends NotFoundException {
    constructor() {
        super("El usuario no fue encontrado.");
        this.name = "UserNotFoundException";
    }
}
