import { BadRequestException } from "@nestjs/common";

export class InvalidLastNameException extends BadRequestException {
    constructor(message: string = "El apellido no es válido.") {
        super(message);
        this.name = "InvalidLastNameException";
    }
}
