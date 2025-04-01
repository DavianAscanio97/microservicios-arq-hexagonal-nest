import { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

export function setupResponseInterceptor(app: INestApplication) {
    app.useGlobalInterceptors(new ResponseInterceptor());
}
