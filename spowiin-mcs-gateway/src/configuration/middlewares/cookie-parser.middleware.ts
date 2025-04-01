// src/middlewares/helmet.middleware.ts
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export function setupCookieParser(app: INestApplication) {
    app.use(cookieParser());
}
