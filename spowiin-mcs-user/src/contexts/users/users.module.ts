import { Module } from "@nestjs/common";
import { UserApplicationService } from "./application/services/user-application.service";
import { DeleteUserUseCase } from "./application/use-cases/delete-user.usecase";
import { GetUserUseCase } from "./application/use-cases/get-user.usecase";
import { UpdateUserUseCase } from "./application/use-cases/update-user.usecase";
import { USER_REPOSITORY_TOKEN } from "./domain/ports/user.repository";
import { DrizzleUserRepository } from "./infraestructure/adapters/drizzle-user.repository.impl";
import { CreateUserUseCase } from "./application/use-cases/create-user.usecase";
import { CryptoOpenSSL } from "src/common/plugins/openSSL/crypto.openssl";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { environment, MCS_AUTH_SERVICE } from "src/common/env";
import { CreatedUserProducer } from "./infraestructure/events/producers/created-user.producers";
import { CreateUserConsumer } from "./infraestructure/events/consumers/create_user.consumer";
import { UpdateUserConsumer } from "./infraestructure/events/consumers/update_user.consumer";
import { GetUserByIdConsumer } from "./infraestructure/events/consumers/get_user_by_id.consumer";
import { DeleteUserConsumer } from "./infraestructure/events/consumers/delete_user_by_id.consumer";
import { USER_SERVICE } from "./domain/ports/user.services";

@Module({
    controllers: [
      CreateUserConsumer,
      UpdateUserConsumer,
      GetUserByIdConsumer,
      DeleteUserConsumer
    ],
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
        ],
    providers: [
        UserApplicationService,
        CreateUserUseCase,
        GetUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        CryptoOpenSSL,
        CreatedUserProducer,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: DrizzleUserRepository
        },
        {
            provide: USER_SERVICE, // token que exportás
            useClass: UserApplicationService,
        }
    ],
})
export class UsersModule { }
