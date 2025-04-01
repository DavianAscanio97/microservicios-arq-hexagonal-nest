import { INestApplication, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { environment } from '../env';

export function setupUserAgentMiddleware(app: INestApplication) {
    const rawAgents = environment.allowedAgents || '';
    const allowAll = rawAgents.trim() === '*';
    const ALLOWED_AGENTS = rawAgents.split(',').map(agent => agent.trim());

    app.use((req: Request, res: Response, next: NextFunction) => {
        const userAgent = req.headers['user-agent'];

        // ✅ Si ALLOWED_AGENTS=* entonces se permite todo
        if (allowAll) {
            return next();
        }

        // ❌ Bloquear si no está en la lista
        if (!userAgent || !ALLOWED_AGENTS.includes(userAgent)) {
            throw new ForbiddenException('🚫 Cliente no autorizado.');
        }

        next();
    });
}
