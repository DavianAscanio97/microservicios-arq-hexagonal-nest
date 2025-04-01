// src/middlewares/rate-limit.middleware.ts
import rateLimit from 'express-rate-limit';
import { HttpStatus, INestApplication } from '@nestjs/common';

export function setupRateLimit(app: INestApplication) {
    app.use(
        rateLimit({
            windowMs: 1 * 60 * 1000, // 1 minuto
            max: 100, // 100 peticiones por minuto
            standardHeaders: true, // Devuelve info de rate limit en headers
            legacyHeaders: false, // Desactiva headers obsoletos
            message: 'Has excedido el límite de peticiones por minuto',
            statusCode: HttpStatus.TOO_MANY_REQUESTS, // Código de estado para rate limit
            skipFailedRequests: true, // No cuenta peticiones fallidas
            skipSuccessfulRequests: false, // Cuenta peticiones exitosas
            keyGenerator: (req) => req.ip, // Genera clave para rate limit
        }),
    );
}
