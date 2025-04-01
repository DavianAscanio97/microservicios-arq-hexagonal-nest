// src/common/guards/microservice-auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientProxy,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Token no proporcionado');
        }

        const token = authHeader.replace('Bearer ', '');

        try {
            const result = await firstValueFrom(
                this.authClient.send('validate_token', { token }),
            );

            if (!result.isValid) {
                throw new UnauthorizedException('Token inválido');
            }

            // Puedes adjuntar la data del usuario al request para usarlo después
            request.user = result.user;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Error al validar el token');
        }
    }
}
