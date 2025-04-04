import { GoneException } from "@nestjs/common";

export class CredentialIsAlreadyDeletedException extends GoneException {
    constructor() {
        super(`El usuario ya ha sido eliminado.`);
        this.name = "UserIsAlreadyDeletedException";
    }
}