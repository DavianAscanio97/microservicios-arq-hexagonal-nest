// src/middlewares/validation.middleware.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupGlobalValidation(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
}
