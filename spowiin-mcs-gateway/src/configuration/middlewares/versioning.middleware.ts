import { INestApplication, VersioningType } from '@nestjs/common';

export function setupVersioning(app: INestApplication) {
    app.enableVersioning({
        type: VersioningType.URI, // También podrías usar HEADER, MEDIA_TYPE o CUSTOM
        defaultVersion: '1',
    });
}
