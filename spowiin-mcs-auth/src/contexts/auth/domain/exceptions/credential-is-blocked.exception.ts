import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialBlockedException extends HttpException {
    constructor() {
        super('El usuario está bloqueado. Contacte con soporte.', 423);
        this.name = 'UserBlockedException';
    }
}
