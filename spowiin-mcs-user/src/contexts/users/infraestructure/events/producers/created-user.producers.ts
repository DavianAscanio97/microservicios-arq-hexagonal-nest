import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MCS_AUTH_SERVICE } from 'src/common/env';
import { User } from 'src/contexts/users/domain/entities/user.entity';

@Injectable()
export class CreatedUserProducer {
    constructor(@Inject(MCS_AUTH_SERVICE) private readonly client: ClientProxy) { }

    async emitUserCreatedEvent(user: User) {
        this.client.emit({ cmd: 'login' },
            {
                email: user.email,
                password: user.password,
            }
        );
    }
}
