import { BadRequestException } from "@nestjs/common";

export class InvalidFirstNameException extends BadRequestException {
    constructor(message: string = "El nombre no es válido.") {
        super(message);
        this.name = "InvalidFirstNameException";
    }
}
