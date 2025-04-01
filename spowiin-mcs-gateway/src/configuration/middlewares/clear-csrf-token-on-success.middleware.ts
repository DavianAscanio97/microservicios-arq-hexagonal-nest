import { HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function clearCsrfTokenOnSuccess(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send.bind(res);

    res.send = function (body?: any): Response {
        const method = req.method.toUpperCase();
        const isReadMethod = ['GET', 'HEAD', 'OPTIONS'].includes(method);
        const isTokenEndpoint = req.originalUrl === '/csrf-token';
        if ((res.statusCode === HttpStatus.OK || res.statusCode === HttpStatus.CREATED) && !isReadMethod && !isTokenEndpoint) {
            res.clearCookie('_csrf');
        }
        return originalSend(body);
    };

    next();
}
