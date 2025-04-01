import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthServices } from "../../application/services/auth.service";
import { LoginDto } from "../../application/dtos/login.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthController {
    constructor(private readonly authServices: AuthServices) { }

    @MessagePattern({ cmd: 'login' })
    async login(@Payload() loginDto: LoginDto): Promise<any> {
        return await this.authServices.login(loginDto);
    }
}
