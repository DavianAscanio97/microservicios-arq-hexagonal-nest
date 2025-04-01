// src/common/interceptors/response.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const path = request.url;

        return next.handle().pipe(
            map((response: any) => {
                const timestamp = new Date().toISOString();

                return {
                    status: response.status || 'success',
                    code: response.code || 200,
                    message: response.message || 'Petición realizada correctamente',
                    data: response.data !== undefined ? response.data : response,
                    path,
                    timestamp,
                };
            }),
        );
    }
}
