import { Module } from "@nestjs/common";
import { LoginUseCase } from "./application/use-cases/login.use-case";
import { CREDENTIAL_REPOSITORY } from "./domain/ports/credential.repositoy";
import { DrizzleCredentialPersistence } from "./infraestructure/adapters/credential-drizzle.persistence";
import { CREDENTIAL_SERVICE } from './domain/ports/credential.services';
import { CredentialApplicationService } from "./application/services/auth.application.service";
import { LoginConsumer } from "./infraestructure/events/consumers/login.consumer";
import { CreateCredentialUseCase } from "./application/use-cases/create-credential.use-case";
import { CreateCredentialConsumer } from "./infraestructure/events/consumers/create-credential.consumer";
import { CryptoOpenSSL } from "src/common/plugins/openSSL/crypto.openssl";

@Module({
    controllers: [LoginConsumer, CreateCredentialConsumer ],
    providers: [
        CredentialApplicationService,
        CreateCredentialUseCase,
        LoginUseCase,
        CryptoOpenSSL,
        { provide: CREDENTIAL_REPOSITORY, useClass: DrizzleCredentialPersistence },
        { provide: CREDENTIAL_SERVICE, useClass: CredentialApplicationService },
    ],
})
export class CredentialModule { }
