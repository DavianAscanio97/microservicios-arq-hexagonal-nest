// src/common/guards/roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/roles.decorator';
import { Role } from './enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('No tienes permisos para acceder a este recurso');
        }

        return true;
    }
}
