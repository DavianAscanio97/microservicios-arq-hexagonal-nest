import { ForbiddenException } from "@nestjs/common";

export class UserIsInactiveException extends ForbiddenException {
    constructor() {
        super("El usuario está inactivo.");
        this.name = "UserIsBlockedException";
    }
}
