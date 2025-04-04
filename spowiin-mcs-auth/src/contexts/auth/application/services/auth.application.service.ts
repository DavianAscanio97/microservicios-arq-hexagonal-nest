import { Injectable } from "@nestjs/common";
import { LoginUseCase } from "../use-cases/login.use-case";
import { LoginDto } from "../../domain/dtos/login.dto";
import { CredentialsService } from "../../domain/ports/credential.services";
import { CreateCredentialDto } from "../../domain/dtos/create-credential.dto";
import { CreateCredentialUseCase } from "../use-cases/create-credential.use-case";

@Injectable()
export class CredentialApplicationService implements CredentialsService {

    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly createCredentialUseCase: CreateCredentialUseCase
    ){}
    createCredential(createCredentialDto: CreateCredentialDto): Promise<any> {
        return this.createCredentialUseCase.execute(createCredentialDto);
    }
    logout(userId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async login(loginDto: LoginDto): Promise<any> {
        return await this.loginUseCase.execute(loginDto);
    }
}