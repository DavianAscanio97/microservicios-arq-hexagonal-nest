import { Module } from '@nestjs/common';
import { ProtectionController } from './protection.controller';
import { KeyPublicOpenSSL } from 'src/configuration/openSSL/crypto.openssl';

@Module({
    controllers: [ProtectionController],
    imports: [
    ],
    providers: [
        KeyPublicOpenSSL
    ],
})
export class ProtectionModule { }