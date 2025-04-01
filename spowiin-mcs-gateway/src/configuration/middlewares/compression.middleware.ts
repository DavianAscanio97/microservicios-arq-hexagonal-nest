import * as compression from 'compression';
import { INestApplication } from '@nestjs/common';

export function setupCompression(app: INestApplication) {
    app.use(compression());
}
