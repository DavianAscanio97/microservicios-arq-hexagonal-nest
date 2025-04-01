import {
    Catch,
    ArgumentsHost,
    RpcExceptionFilter,
    HttpStatus,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class RpcExceptionsFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: any, host: ArgumentsHost): Observable<any> {
        console.error('Error capturado:', exception);

        const response = this.buildErrorResponse(exception);
        return throwError(() => new RpcException(response));
    }

    private buildErrorResponse(exception: any) {
        if (exception instanceof BadRequestException) {
            return this.handleBadRequestException(exception);
        }

        if (exception instanceof ConflictException) {
            return this.handleConflictException(exception);
        }
        if (exception.code === '23505') {
            return this.handleDatabaseUniqueConstraintException(exception);
        }

        return this.handleUnknownException(exception);
    }

    private handleBadRequestException(exception: BadRequestException) {
        return {
            status: 'error',
            code: HttpStatus.BAD_REQUEST,
            message: exception.message || 'Solicitud incorrecta',
            data: exception.getResponse(),
            timestamp: new Date().toISOString(),
        };
    }

    private handleConflictException(exception: ConflictException) {
        return {
            status: 'error',
            code: HttpStatus.CONFLICT,
            message: 'El recurso ya existe',
            data: exception.getResponse(),
            timestamp: new Date().toISOString(),
        };
    }

    private handleDatabaseUniqueConstraintException(exception: any) {
        let message = 'Violación de restricción de unicidad';
        if (exception.constraint === 'users_email_unique') {
            message = 'El correo electrónico ya está en uso';
        }
        if (exception.constraint === 'users_slug_unique') {
            message = 'El nombre de usuario ya está en uso';
        }
        return {
            status: 'error',
            code: HttpStatus.CONFLICT,
            message,
            data: null,
            timestamp: new Date().toISOString(),
        };
    }

    private handleUnknownException(exception: any) {
        return {
            status: 'error',
            code: exception.status || HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message || 'Error interno del servidor',
            data: exception?.data || null,
            timestamp: new Date().toISOString(),
        };
    }
}