// src/middlewares/helmet.middleware.ts
import helmet from 'helmet';
import { INestApplication } from '@nestjs/common';

export function setupHelmet(app: INestApplication) {
    app.use(helmet());
}
