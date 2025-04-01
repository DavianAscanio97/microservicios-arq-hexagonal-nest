import {
    Controller,
    Get,
    Head,
    Req,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { KeyPublicOpenSSL } from 'src/configuration/openSSL/crypto.openssl';

@ApiTags('Protection')
@Controller('protection')
export class ProtectionController {

    @Head('csrf-token')
    getCsrfToken(@Req() req: Request, @Res() res: Response) {
        const token = req.csrfToken();
        res.setHeader('XSRF-TOKEN', token);
        res.cookie('XSRF-TOKEN', token, { httpOnly: false });
        return res.status(204).send();
    }

    @Get('public-key')
    getPublicKeyRes() {
        const KEY_SERVICES = new KeyPublicOpenSSL();
        const KEY_PUBLIC = KEY_SERVICES.encryptData()
        return {
            data: KEY_PUBLIC,
            message: 'Llave pública generada correctamente',
        };
    }

    @Get('client-info')
    getClientInfo(@Req() req: Request) {
        return {
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            cookies: req.cookies,
            csrfHeader: req.headers['x-csrf-token'],
        };
    }

}