import { INestApplication } from '@nestjs/common';

export function setupGlobalPrefix(app: INestApplication) {
    app.setGlobalPrefix('api');
}
