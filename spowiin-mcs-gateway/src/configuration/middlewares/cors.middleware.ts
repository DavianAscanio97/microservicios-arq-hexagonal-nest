// src/middlewares/cors.middleware.ts
import * as cors from 'cors';
import { INestApplication } from '@nestjs/common';

export function setupCors(app: INestApplication) {
    app.use(
        cors({
            origin: ['*'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        }),
    );
}
