import { BadRequestException } from "@nestjs/common";

export class InvalidPasswordException extends BadRequestException {
    constructor() {
        super("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
        this.name = "InvalidPasswordException";
    }
}
