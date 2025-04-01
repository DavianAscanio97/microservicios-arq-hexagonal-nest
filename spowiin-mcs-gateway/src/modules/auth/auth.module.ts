import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environment, MCS_AUTH_SERVICE } from 'src/configuration/env';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.register([
      {
        name: MCS_AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: environment.authMicroserviceHost,
          port: environment.authMicroservicePort
        }
      },
    ]),
  ]
})
export class AuthModule { }