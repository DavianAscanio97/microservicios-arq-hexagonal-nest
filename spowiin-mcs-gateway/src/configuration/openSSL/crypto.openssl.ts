import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { environment } from '../env/environments';

interface EncryptedResult {
    encryptedBase64: string;
}

@Injectable()
export class KeyPublicOpenSSL {
    private readonly publicKey: Buffer;

    constructor() {
        const publicKeyPath = path.join(
            process.cwd(),
            'src',
            'configuration',
            'openSSL',
            'public.pem',
        );
        this.publicKey = fs.readFileSync(publicKeyPath);
    }

    getPublicKey(): string {
        return this.publicKey.toString('utf8');
    }

    encryptData(): string {
        const PAYLOAD_KEY = {
            password: environment.base64Secret,
            check: environment.base64Check,
        }
        const buffer = Buffer.from(JSON.stringify(PAYLOAD_KEY), 'utf8');

        const encrypted = crypto.publicEncrypt(
            {
                key: this.publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            buffer,
        );

        return encrypted.toString('base64');
    }
}
