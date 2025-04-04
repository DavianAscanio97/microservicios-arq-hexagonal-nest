import { LoginDto } from "../../domain/dtos/login.dto";
import { CredentialActions } from '../../domain/entities/credential.actions';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginUseCase {

    async execute(loginDto: LoginDto){
        CredentialActions.login(loginDto);
        return {
            message: 'Login successful',
            data: {}
        };
    }
}