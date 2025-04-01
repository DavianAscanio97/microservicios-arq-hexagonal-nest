import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environment, MCS_USER_SERVICE } from 'src/configuration/env';

@Module({
  controllers: [UsersController],
  imports: [
    ClientsModule.register([
      {
        name: MCS_USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: environment.usersMicroserviceHost,
          port: environment.usersMicroservicePort
        }
      },

    ]),
  ]
})
export class UsersModule { }