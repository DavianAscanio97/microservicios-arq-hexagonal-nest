import { ForbiddenException } from "@nestjs/common";

export class CredentialIsInactiveException extends ForbiddenException {
    constructor() {
        super("El usuario está inactivo.");
        this.name = "UserIsBlockedException";
    }
}
