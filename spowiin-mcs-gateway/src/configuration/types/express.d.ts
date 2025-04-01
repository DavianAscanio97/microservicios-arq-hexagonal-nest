import 'express';

declare module 'express' {
    interface Request {
        csrfToken(): string;
    }
}
