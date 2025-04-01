import { Module } from "@nestjs/common";
import { AuthServices } from "./application/services/auth.service";
import { LoginUseCase } from "./application/use-cases/login.use-case";
import { AuthController } from "./infraestructure/controllers/auth.controller";
import { AUTH_REPOSITORY } from "./domain/repositories/auth.repositoy";
import { AuthDrizzlePersistence } from "./infraestructure/persistence/auth-drizzle.persistence";

@Module({
    controllers: [AuthController],
    providers: [
        AuthServices,
        LoginUseCase,
        
        { provide: AUTH_REPOSITORY, useClass: AuthDrizzlePersistence },
    ],
})
export class AuthModule { }
