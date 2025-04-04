import { BadRequestException } from "@nestjs/common";

export class CredentialsDoNotMatchException extends BadRequestException {
    constructor() {
        super(`Las credenciales no coinciden.`);
        this.name = "CredentialsDoNotMatchException";
    }
}