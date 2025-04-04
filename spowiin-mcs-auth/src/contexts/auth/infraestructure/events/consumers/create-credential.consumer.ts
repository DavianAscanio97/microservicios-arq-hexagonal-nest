
import { MessagePattern } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { CredentialsService, CREDENTIAL_SERVICE } from "src/contexts/auth/domain/ports/credential.services";
import { CreateCredentialDto } from "src/contexts/auth/domain/dtos/create-credential.dto";
@Injectable()
export class CreateCredentialConsumer {
    constructor(
        @Inject(CREDENTIAL_SERVICE)
        private readonly userService: CredentialsService) { }
    @MessagePattern({ cmd: 'create_credentials_user' })
    login(createCredentialDto: CreateCredentialDto): Promise<any>{
        return this.userService.createCredential(createCredentialDto);
    }
}
