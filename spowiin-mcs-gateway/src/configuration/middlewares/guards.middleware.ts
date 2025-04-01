import { INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../guards/roles/roles.guard';
// Aquí puedes importar más guards personalizados
// import { PermissionsGuard } from '../../common/guards/permissions.guard';

export function setupGlobalGuards(app: INestApplication) {
    const reflector = app.get(Reflector);

    app.useGlobalGuards(
        new RolesGuard(reflector),
        // new PermissionsGuard(reflector),
        // Agrega aquí otros guards si los necesitas
    );
}
