import { INestApplication } from '@nestjs/common';
import { AllExceptionsFilter } from '../filters/http-exception.filter';

export function setupExceptionFilter(app: INestApplication) {
    app.useGlobalFilters(new AllExceptionsFilter());
}
