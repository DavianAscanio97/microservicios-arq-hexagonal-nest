import { BadRequestException } from "@nestjs/common";

export class InvalidEmailException extends BadRequestException {
    constructor(email: string) {
        super(`El email "${email}" no tiene un formato válido.`);
        this.name = "InvalidEmailException";
    }
}
