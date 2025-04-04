
import { MessagePattern } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { CredentialsService, CREDENTIAL_SERVICE } from "src/contexts/auth/domain/ports/credential.services";
import { LoginDto } from "src/contexts/auth/domain/dtos/login.dto";
@Injectable()
export class LoginConsumer {
    constructor(
        @Inject(CREDENTIAL_SERVICE)
        private readonly userService: CredentialsService) { }
    @MessagePattern({ cmd: 'login' })
    login(loginDto: LoginDto): Promise<any>{
        return this.userService.login(loginDto);
    }
}
