import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import e from 'express';
import { MCS_AUTH_SERVICE } from 'src/common/env';
import { User } from 'src/contexts/users/domain/entities/user.entity';

@Injectable()
export class CreatedUserProducer {
    constructor(@Inject(MCS_AUTH_SERVICE) private readonly client: ClientProxy) { }
    async emitUserCreatedEvent(user: User, extra?: object) {
        this.client.emit({ cmd: 'create_credentials_user' },
            {
                userId: user.id,
                firstName: user._firstName,
                lastName: user._lastName,
                email: user._email,
                password: extra['password'],
                confirmPassword: extra['confirmPassword'],
            }
        );
    }
}
