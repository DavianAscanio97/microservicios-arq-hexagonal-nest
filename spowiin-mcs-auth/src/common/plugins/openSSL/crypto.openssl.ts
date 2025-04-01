import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { environment } from 'src/common/env';

interface DecryptedData {
    password: string,
    check: string,
}

@Injectable()
export class CryptoOpenSSL {
    private readonly privateKey: Buffer;
    private readonly HMAC_SECRET = environment.hmacSecret;

    constructor() {
        const privateKeyPath = path.join(process.cwd(), 'src', 'common', 'plugins', 'openSSL', 'private.pem');
        this.privateKey = fs.readFileSync(privateKeyPath);
    }

    decryptBase64(encryptedBase64: string): DecryptedData {
        const buffer = Buffer.from(encryptedBase64, 'base64');

        const decrypted = crypto.privateDecrypt(
            {
                key: this.privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            buffer,
        );

        const decryptedText = decrypted.toString('utf8');
        const parsed = JSON.parse(decryptedText);

        // Verificar estructura
        if (!parsed?.data || !parsed?.hmac) {
            throw new BadRequestException('No se pudo procesar la solicitud.');
        }

        // Recalcular HMAC y comparar
        const recalculatedHmac = crypto
            .createHmac('sha256', this.HMAC_SECRET)
            .update(JSON.stringify(parsed.data))
            .digest('hex');

        if (recalculatedHmac !== parsed.hmac) {
            throw new BadRequestException('No se pudo procesar la solicitud.');
        }

        return parsed.data;
    }

    tryDecryptBase64(encryptedBase64: string): DecryptedData {
        try {
            return this.decryptBase64(encryptedBase64);
        } catch (error) {
            throw new BadRequestException('No se pudo procesar la solicitud.');
        }
    }
}
