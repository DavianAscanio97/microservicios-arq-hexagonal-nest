import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';

// 📌 Definir una interfaz para el error de RPC
interface RpcErrorFormat {
    code?: number;
    message: string;
    path?: string;
    timestamp?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any = 'Error interno del servidor';
        let path = request.url;

        // 📌 Controlar error de CSRF (csurf)
        if (typeof exception === 'object' && exception !== null && (exception as any).code === 'EBADCSRFTOKEN') {
            status = HttpStatus.FORBIDDEN;
            message = 'No se pudo procesar la solicitud CSRF';
        }
        // 📌 Si la excepción es una `HttpException`
        else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();

            if (typeof errorResponse === 'object' && errorResponse !== null) {
                const rawMessage = (errorResponse as any).message;
                message = rawMessage || 'Error';
                path = (errorResponse as any).path || request.url;
                if (
                    Array.isArray(rawMessage) &&
                    rawMessage.some((msg: string) => msg.includes('should not exist'))
                ) {
                    message = 'No se pudo procesar la solicitud';
                }
            } else {
                message = errorResponse;
            }
        }
        // 📌 Si la excepción es una `RpcException`
        else if (exception instanceof RpcException) {
            const errorResponse = exception.getError() as RpcErrorFormat;

            status = errorResponse.code ?? 500; //
            message = errorResponse.message || 'No se pudo procesar la solicitud';
            path = errorResponse.path || request.url;
        }
        // 📌 Si es un `Error` genérico
        else if (exception instanceof Error) {
            message = exception.message;
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        // 📌 Si es un objeto desconocido
        else if(typeof exception === 'object' && exception !== null) {
            const error = exception['error'] || {};
            message = error['message'] || 'Error interno desconocido';
            status = error['code'] || 'Error interno desconocido';
        } else {
            message = 'Error interno desconocido';
        }

        response.status(status).json({
            status: 'error',
            code: status,
            message: Array.isArray(message) ? message[0] : message,
            data: null,
            path,
            timestamp: new Date().toISOString(),
        });
    }
}
