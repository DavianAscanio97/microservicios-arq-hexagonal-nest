import { INestMicroservice } from '@nestjs/common';
import { RpcExceptionsFilter } from '../exceptions/rpc-exception.filter';

export function setupExceptionFilter(app: INestMicroservice) {
    app.useGlobalFilters(new RpcExceptionsFilter());
}
