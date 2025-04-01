import { Injectable } from "@nestjs/common";
import { LoginUseCase } from "../use-cases/login.use-case";
import { LoginDto } from "../dtos/login.dto";

@Injectable()
export class AuthServices{

    constructor(
        private readonly loginUseCase: LoginUseCase,
    ){}

    async login(loginDto: LoginDto): Promise<any> {
        return await this.loginUseCase.execute(loginDto);
    }
}