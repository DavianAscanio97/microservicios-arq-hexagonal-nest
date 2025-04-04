import { CreateCredentialDto } from "../../domain/dtos/create-credential.dto";
import { Inject, Injectable } from "@nestjs/common";
import { CredentialFactory } from "../../domain/entities/credential.factory";
import { CREDENTIAL_REPOSITORY, CredentialRepository } from "../../domain/ports/credential.repositoy";
import { CredentialActions } from "../../domain/entities/credential.actions";
import { CryptoOpenSSL } from "src/common/plugins/openSSL/crypto.openssl";

@Injectable()
export class CreateCredentialUseCase {

    constructor(
        @Inject(CREDENTIAL_REPOSITORY)
        private readonly _credentialRepository: CredentialRepository,
        @Inject(CryptoOpenSSL)
        private readonly cryptoOpenSSL: CryptoOpenSSL,
    ) { }

    async execute(createCredentialDto: CreateCredentialDto){

        // Verificar si la contraseña está cifrada
        createCredentialDto.password = this.cryptoOpenSSL.tryDecryptBase64(createCredentialDto.password).password;
        createCredentialDto.confirmPassword = this.cryptoOpenSSL.tryDecryptBase64(createCredentialDto.confirmPassword).password;

        //Verificamos si las contraseñas coinciden
        CredentialActions.checkCredentials(createCredentialDto.password, createCredentialDto.confirmPassword);

        const newCredential = CredentialFactory.create(createCredentialDto);

        // 📌 Guardamos el usuario en la base de datos
        await this._credentialRepository.create(newCredential);

        // 📌 Retornamos el usuario creado solo con propiedades publicas
        return CredentialFactory.toPublicUser(newCredential);
    }
}