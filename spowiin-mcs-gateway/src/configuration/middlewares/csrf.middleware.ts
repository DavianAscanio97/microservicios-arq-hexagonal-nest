import { INestApplication } from '@nestjs/common';
import * as csurf from 'csurf';
import { clearCsrfTokenOnSuccess } from './clear-csrf-token-on-success.middleware';
import { environment } from '../env/environments';

export function setupCsurfApp(app: INestApplication) {
    app.use(
        csurf({
            cookie: {
                key: '_csrf', // Nombre de la cookie CSRF
                httpOnly: true, // No accesible desde JavaScript
                secure: environment.nodeEnv === "production", // Solo HTTPS en producción
                sameSite: 'strict', // Protección contra CSRF
                maxAge: 30 * 60 * 1000, // 30 minutos en milisegundos
            },
            value: (req) => {
                const TOKEN_FROM_COOKIE = req.cookies['XSRF-TOKEN'];
                return TOKEN_FROM_COOKIE;
            },
            ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
        })
    );
    app.use(clearCsrfTokenOnSuccess);

}
