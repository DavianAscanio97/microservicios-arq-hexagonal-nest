import { LoginDto } from "../dtos/login.dto";
import { AuthActions } from '../../domain/entities/auth.actions';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginUseCase {

    async execute(loginDto: LoginDto){
        AuthActions.login(loginDto);
        return {
            message: 'Login successful',
            data: {}
        };
    }
}